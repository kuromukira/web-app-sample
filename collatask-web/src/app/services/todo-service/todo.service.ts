import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from 'src/app/models/todo.model';
import { BehaviorSubject } from 'rxjs';
import { ServiceReturn } from 'src/app/models/service.model';

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
        for (var i = 0; i < 50; i++) {
            let _todo = new TodoModel();
            _todo.todoId = Guid.create().toString();
            _todo.description = "Todo # " + (i + 1).toString();
            _todo.addedBy = "norgelera@outlook.com";
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
        try {
            this.$_inProgress.next(true);
            // make http request here
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === id)
                    this.$_todo.next(Object.assign({}, _todo));
            }
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async getAll() {
        try {
            this.$_inProgress.next(true);
            // make http request here
            this.$_todos.next(Object.assign([], this.lTestTodos.filter((data) => { return !data.isCompleted; })));
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async add(todo: TodoModel) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            todo.todoId = Guid.create().toString();
            todo.dateAdded = new Date();
            this.lTestTodos.push(todo);
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async modify(todo: TodoModel) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === todo.todoId)
                    _todo.description = todo.description;
            }
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async remove(id: string) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            let _index: number;
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === id)
                    _index = this.lTestTodos.indexOf(_todo);
            }
            this.lTestTodos.splice(_index, 1);
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async complete(id: string) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === id)
                    _todo.isCompleted = true;
            }
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    // !============================================================== SUB TODOS =============================================================

    async getSubOf(parentId: string) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === parentId)
                    this.$_subTodos.next(Object.assign([], _todo.sub.filter((data) => { return !data.isCompleted; })));
            }
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async getSub(parentId: string, id: string) {
        try {
            this.$_inProgress.next(true);
            // make http request here
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
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async addSub(sub: TodoModel) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === sub.parentTodoId) {
                    sub.todoId = Guid.create().toString();
                    sub.dateAdded = new Date();
                    _todo.sub.push(sub);
                }
            }
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async modifySub(sub: TodoModel) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === sub.parentTodoId) {
                    for (let _subTodo of _todo.sub) {
                        if (_subTodo.todoId === sub.todoId)
                            _subTodo.description = sub.description;
                    }
                }
            }
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async removeSub(parentId: string, subId: string) {
        try {
            this.$_inProgress.next(true);
            // make http request here
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
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async completeSub(parentId: string, subId: string) {
        try {
            this.$_inProgress.next(true);
            // make http request here
            for (let _todo of this.lTestTodos) {
                if (_todo.todoId === parentId) {
                    for (let _subTodo of _todo.sub) {
                        if (_subTodo.todoId === subId)
                            _subTodo.isCompleted = true;
                    }
                }
            }
            // finally
            this.$_inProgress.next(false);
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

}