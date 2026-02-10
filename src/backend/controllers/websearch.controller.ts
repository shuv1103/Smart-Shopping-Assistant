import { ApiResponse } from "../utils/ApiResponse.js";
import { WebSearchAgent } from "../agents/websearch.agent.js";
import { ProductSearchInput } from "../tools/websearch/websearch.types.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const webSearchAgent = new WebSearchAgent();

const webSearchController = asyncHandler(async (req, res) => {
    const { question, maxResults } = req.body as Partial<ProductSearchInput>;

    if (!question) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Question is required"));
    }

    const input: ProductSearchInput = {
        question,
        maxResults: typeof maxResults === "number" ? maxResults : 5
    };

    const result = await webSearchAgent.run(input);
    return res.status(200).json(new ApiResponse(200, result));
});

export { webSearchController };
