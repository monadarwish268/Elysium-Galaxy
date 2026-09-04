/**
 * Standardized API response interface used across the application.
 * @template T - The type of the response data
 */
export interface IResponse<T = unknown> {
    status: number
    message?: string
    data?: T
    error?: string
}
