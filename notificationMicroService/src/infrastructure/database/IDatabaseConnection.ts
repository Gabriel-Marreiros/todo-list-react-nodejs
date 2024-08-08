export interface IDatabaseConnection {
    connect(): Promise<any>;
}