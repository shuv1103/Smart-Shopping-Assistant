import { tavily } from "@tavily/core";

export function getTavilyClient() {
    const tavily_api_key = process.env.TAVILY_API_KEY;

    if (!tavily_api_key) {
        throw new Error("TAVILY_API_KEY is not set in env file");
    }

    return tavily({
        apiKey: tavily_api_key
    });
}
