import { Store } from '../state-store/store.service';
import { TodoModel } from 'src/app/models/todo.model';
import { Injectable } from '@angular/core';

export class TodoState {

    todos: TodoModel[] = [];
    todo: TodoModel = new TodoModel();
    addedTodo: TodoModel = new TodoModel();
    todoId: string = '';

    subTodos: TodoModel[] = [];
    subTodo: TodoModel = new TodoModel();

    inProgress: boolean;

}

@Injectable()
export class TodoStore extends Store<TodoState> {

    constructor() {
        super(new TodoState());
    }

    addTodo(todo: TodoModel) {
        this.setState({
            ...this.state,
            addedTodo: todo
        });
    }

}