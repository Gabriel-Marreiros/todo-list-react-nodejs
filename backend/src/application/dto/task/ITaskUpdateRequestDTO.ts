export interface ITaskUpdateRequestDTO {
    id: string;
    title: string;
    description: string;
    category: string;
    startDateTime: Date;
    endDateTime: Date;
}