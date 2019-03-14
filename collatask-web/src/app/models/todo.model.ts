export class TodoModel {
    todoId: string; // Guid
    parentTodoId: string; // Guid
    description: string;
    addedBy: string; // email address
    currentUser: string; // email address
    isCompleted: boolean;
    dateAdded: Date;
    sub: TodoModel[] = [];
}