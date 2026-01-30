import { tavilyClient } from "./tavilyClient";
import { ProductSearchInput, ProductResult, WebSearchResult } from "./websearch.types";
import { extractProductName, extractPrice } from "./websearch.helpers";

export class WebSearchTool
{
    static async searchProducts(input: ProductSearchInput): Promise<WebSearchResult>
    {
        const {question, maxResults} = input;

        const response = await tavilyClient.search(question,{
            maxResults: maxResults,
            searchDepth: "advanced"
        });

        const products: ProductResult[] = (response.results || []).map(
            (items: any) => ({
                name: extractProductName(items.title),
                price: extractPrice(items.content),
                link: items.url,
                source: items.source ?? "web"
            })
        );
        
        return {
            query: question,
            results: products
        }
    }
}

