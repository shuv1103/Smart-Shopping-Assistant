export function extractProductName(title: string): string {
    return title?.split("|")[0]?.trim() || "Unknown Product";
}

export function extractPrice(content: string): number | null {
    if (!content)
    {
        return null;
    } 
    const match = content.match(/\$([0-9]{2,4})(?:\.[0-9]{2})?/);
    if (!match || !match[1])
    {
        return null;
    }
    return Number(match[1]);
  }
  