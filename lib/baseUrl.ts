/**
 * Build API base URL for axios configuration
 * @param path - The API path to append to the base URL
 * @returns The full base URL
 */
export function buildUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    return `${baseUrl}/${path}`
}
