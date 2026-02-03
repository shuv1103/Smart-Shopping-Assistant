import { createHash } from "crypto";
import { ToolCallCache } from "../redis/tool_cache";
import { WebSearchTool } from "../tools/websearch/websearch.tool";
import { ProductSearchInput, WebSearchResult } from "../tools/websearch/websearch.types";

const DEFAULT_MAX_RESULTS = 5;
const MAX_ALLOWED_RESULTS = 20;
const CACHE_TTL_SECONDS = 300;

export class WebSearchAgent {
    private cache = new ToolCallCache<WebSearchResult>("websearch");
    private inFlight = new Map<string, Promise<WebSearchResult>>();

    async run(input: ProductSearchInput): Promise<WebSearchResult> {
        const normalizedInput = this.normalizeInput(input);
        const cacheKey = this.getCacheKey(normalizedInput);

        const cachedResult = await this.cache.get([normalizedInput]);
        if (cachedResult) {
            return cachedResult;
        }

        const existingPromise = this.inFlight.get(cacheKey);
        if (existingPromise) {
            return existingPromise;
        }

        const searchPromise = WebSearchTool.searchProducts(normalizedInput)
            .then(async (result) => {
                await this.cache.set([normalizedInput], result, CACHE_TTL_SECONDS);
                return result;
            })
            .finally(() => {
                this.inFlight.delete(cacheKey);
            });

        this.inFlight.set(cacheKey, searchPromise);
        return searchPromise;
    }

    private normalizeInput(input: ProductSearchInput): ProductSearchInput {
        const question = input.question?.trim();
        const maxResults = Number.isFinite(input.maxResults)
            ? Math.min(Math.max(Math.floor(input.maxResults), 1), MAX_ALLOWED_RESULTS)
            : DEFAULT_MAX_RESULTS;

        if (!question) {
            throw new Error("Question is required");
        }

        return {
            question,
            maxResults
        };
    }

    private getCacheKey(input: ProductSearchInput): string {
        const argsString = JSON.stringify([input]);
        return createHash("sha256").update(argsString).digest("hex");
    }
}
