export interface ICustomError extends Error {
    title: string;
    message: string;
    status: number;
    instance: string;
}