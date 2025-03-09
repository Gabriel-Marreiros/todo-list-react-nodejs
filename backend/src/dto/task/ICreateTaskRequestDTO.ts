export interface ICreateTaskRequestDTO {
    title: string;
    description: string;
    category?: string;
    user?: string
    recurrent: boolean;
    startDateTime: Date;
    endDateTime: Date;
}