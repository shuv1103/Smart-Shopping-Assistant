import { tavily } from "@tavily/core";

const tavily_api_key = process.env.TAVILY_API_KEY;

if(!tavily_api_key)
{
    throw new Error("TAVILY_API_KEY is not set at env file");
}

export const tavilyClient = tavily({
    apiKey: tavily_api_key
});
