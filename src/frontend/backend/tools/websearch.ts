import { GoogleCustomSearch } from "@langchain/community/tools/google_custom_search";
import { Tool } from "@langchain/core/tools";

class WebSearchTool extends Tool {
    name = "web-search";
    description = "A tool that can be used to search the web for information.";

    private googleCustomSearch: GoogleCustomSearch;

    constructor() {
        super();
        if (!process.env.GOOGLE_API_KEY || !process.env.GOOGLE_CSE_ID) {
            throw new Error(
                "Missing GOOGLE_API_KEY or GOOGLE_CSE_ID environment variables."
            );
        }

        this.googleCustomSearch = new GoogleCustomSearch({
            apiKey: process.env.GOOGLE_API_KEY,
            googleCSEId: process.env.GOOGLE_CSE_ID,
        });
    }

    protected async _call(query: string): Promise<string> {
        try {
            const result = await this.googleCustomSearch.call(query);
            return result;
        } catch (error) {
            if (error instanceof Error) {
                return `Error searching web: ${error.message}`;
            }
            return "An unknown error occurred while searching the web.";
        }
    }
}

export const webSearchTool = new WebSearchTool();
