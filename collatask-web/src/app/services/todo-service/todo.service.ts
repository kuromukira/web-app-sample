import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from 'src/app/models/todo.model';
import { BehaviorSubject, ObjectUnsubscribedError } from 'rxjs';

import { Guid } from 'guid-typescript';

// Change this per actual URL of API
const API_URL: string = 'https://localhost:5001/';

/**
 * ! Added setInterval to simulate 1 second http request
 */

@Injectable()
export class TodoService {

    // Testing variables
    private lTestTodos: TodoModel[] = [];

    constructor(private http: HttpClient) {
        // Test data only
        let _addedBy: string = Guid.create().toString();
        for (var i = 0; i < 100; i++) {
            if (i % 5 === 0)
                _addedBy = Guid.create().toString();
            let _todo = new TodoModel();
            _todo.todoId = Guid.create().toString();
            _todo.description = "Todo # " + (i + 1).toString();
            _todo.addedBy = _addedBy;
            _todo.dateAdded = new Date();
            _todo.isCompleted = false;
            this.lTestTodos.push(_todo);
        }
    }

    $_todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject([]);
    $_subTodos: BehaviorSubject<TodoModel[]> = new BehaviorSubject([]);
    $_subTodo: BehaviorSubject<TodoModel> = new BehaviorSubject(new TodoModel());
    $_todo: BehaviorSubject<TodoModel> = new BehaviorSubject(new TodoModel());
    $_inProgress: BehaviorSubject<boolean> = new BehaviorSubject(false);

    async clearSubjects() {
        this.$_todo.next(Object.assign({}, new TodoModel()));
        this.$_subTodo.next(Object.assign({}, new TodoModel()));
        this.$_todos.next(Object.assign([], []));
        this.$_subTodos.next(Object.assign([], []));
    }

    // !================================================================ TODOS ===============================================================

    async get(id: string) {
        this.$_inProgress.next(true);
        // make http request here
        for (let _todo of this.lTestTodos) {
            if (_todo.todoId === id)
                this.$_todo.next(Object.assign({}, _todo));
        }
        // finally
        this.$_inProgress.next(false);
    }

    async getAll() {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            this.$_todos.next(Object.assign([], this.lTestTodos));
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    async add(todo: TodoModel) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            this.lTestTodos.push(todo);
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    async modify(todo: TodoModel) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === todo.todoId) {
                    _todo.description = todo.description;
                    _todo.isCompleted = todo.isCompleted;
                }
            }
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    async remove(id: string) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            let _index: number;
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === id)
                    _index = this.lTestTodos.indexOf(_todo);
            }
            this.lTestTodos.splice(_index, 1);
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    // !============================================================== SUB TODOS =============================================================

    async getSubOf(parentId: string) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === parentId)
                    this.$_subTodos.next(Object.assign([], _todo.sub));
            }
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    async getSub(parentId: string, id: string) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === parentId) {
                    for (let _subTodo of _todo.sub) {
                        if (_subTodo.todoId === id)
                            this.$_subTodo.next(Object.assign({}, _subTodo));
                    }
                }
            }
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    async addSub(sub: TodoModel) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === sub.parentTodoId)
                    _todo.sub.push(sub);
            }
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    async modifySub(sub: TodoModel) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === sub.parentTodoId) {
                    for (let _subTodo of _todo.sub) {
                        if (_subTodo.todoId === sub.todoId) {
                            _subTodo.description = sub.description;
                            _subTodo.isCompleted = sub.isCompleted;
                        }
                    }
                }
            }
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

    async removeSub(parentId: string, subId: string) {
        this.$_inProgress.next(true);
        // make http request here
        setTimeout(() => {
            let _index: number;
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === parentId) {
                    for (let _subTodo of _todo.sub) {
                        if (_subTodo.todoId === subId)
                            _index = _todo.sub.indexOf(_subTodo);
                    }
                    _todo.sub.splice(_index, 1);
                }
            }
            // finally
            this.$_inProgress.next(false);
        }, 1000);
    }

}