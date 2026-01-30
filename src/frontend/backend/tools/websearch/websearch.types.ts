export interface ProductSearchInput
{
    question: string;
    maxResults: number;
}

export interface ProductResult
{
    name: string;
    price?: number;
    link: string; // product web search url
    source: string; // source of url(Flipkart,Amazon,etc)
}

export interface WebSearchResult
{
    query: string;
    results: ProductResult[];
}