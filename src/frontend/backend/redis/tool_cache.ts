import {redis} from "./redisClient";
import { createHash } from "crypto";

// Generic redis cache for tool calls
export class ToolCallCache<T>
{
    private toolName: string;
    constructor(toolName: string)
    {
        this.toolName = toolName;
    }

    private getKey(args: any[]): string
    {
        const argsString = JSON.stringify(args);
        const hash = createHash('sha256').update(argsString).digest('hex');
        return `tool-cache:${this.toolName}:${hash}`;
    }

    // Cache the result of a tool call with a TTL
    async set(args: any[], result: T, ttlSeconds = 3600): Promise<void> {
        const key = this.getKey(args);
        await redis.set(key, JSON.stringify(result),"EX",ttlSeconds);
    } 

    async get(args: any[]): Promise<T | null> 
    {
        const key = this.getKey(args);
        const data = await redis.get(key); // async call to redis to get key value 
        if(!data)
        {
            return null;
        }
        else
        {
            return (JSON.parse(data) as T);
        }
    }
    
    // Clear a cached tool call result
    async clear(args: any[]): Promise<void>
    {
        const key = this.getKey(args);
        await redis.del(key);
    }
    
}
