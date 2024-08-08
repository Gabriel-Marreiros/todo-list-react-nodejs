export interface IBaseError extends Error {
    title: string;
    message: string;
    status: number;
    instance: string;
}