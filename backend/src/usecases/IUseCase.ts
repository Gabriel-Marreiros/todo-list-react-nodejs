export interface IUseCase<P, R> {
    execute(parameter: P): R;
}