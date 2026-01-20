import { ToolCallCache } from "../redis/tool_cache";

export abstract class BaseAgent {
    private toolCallCache: ToolCallCache<any>;

    constructor(toolName: string) {
        this.toolCallCache = new ToolCallCache(toolName);
    }

    protected async getCachedToolCall(args: any[]): Promise<any | null> {
        return this.toolCallCache.get(args);
    }

    protected async setCachedToolCall(args: any[], result: any, ttlSeconds?: number): Promise<void> {
        await this.toolCallCache.set(args, result, ttlSeconds);
    }

    abstract run(args: any): Promise<any>;
}
