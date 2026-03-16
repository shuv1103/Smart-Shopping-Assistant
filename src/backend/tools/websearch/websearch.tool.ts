import { getTavilyClient } from "./tavilyClient.js";
import { ProductSearchInput, ProductResult, WebSearchResult } from "./websearch.types.js";
import { extractProductName, extractPrice } from "./websearch.helpers.js";

export class WebSearchTool
{
    static async searchProducts(input: ProductSearchInput): Promise<WebSearchResult>
    {
        const {question, maxResults} = input;

        const tavilyClient = getTavilyClient()
        const response = await tavilyClient.search(question,{
            maxResults: maxResults,
            searchDepth: "advanced"
        });
        /*
            response is of type:
            interface TavilySearchResponse {
                query: string;               // The original search query
                answer?: string;             // Optional AI-generated answer (if requested)
                results: {
                    title: string;             // Title of the result page
                    url: string;               // URL of the source
                    content: string;           // Snippet of content
                    score: number;             // Relevance score (float)
                    rawContent?: string;       // Cleaned HTML (if includeRawContent is true)
                    publishedDate?: string;    // Date of publication (if news topic)
                    favicon?: string;          // Favicon URL (if requested)
                }[];
                images?: string[];           // List of image URLs (if requested)
                responseTime: number;        // Time taken to perform search
                }
        */

        const products: ProductResult[] = (response.results || []).map(
            (items: any): ProductResult => {
                const price = extractPrice(items.content);
        
                return {
                    name: extractProductName(items.title),
                    price: price === null ? undefined : price, 
                    link: items.url,
                    source: items.source ?? "web"
                };
            }
        );
        
        return {
            query: question,
            results: products
        }
    }
}

