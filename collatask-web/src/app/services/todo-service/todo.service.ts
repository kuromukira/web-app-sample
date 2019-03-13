import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TodoModel } from 'src/app/models/todo.model';
import { BehaviorSubject } from 'rxjs';
import { ServiceReturn } from 'src/app/models/service.model';

import { Guid } from 'guid-typescript';

// Change this per actual URL of API
const API_URL: string = 'https://localhost:44311/';

/**
 * ! Changes inside this service will not affect the UI as long as there are no changes to the parameters
 */

@Injectable()
export class TodoService {

    // Testing variables
    private lTestTodos: TodoModel[] = [];

    constructor(private http: HttpClient) { }

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
            const _httpParams = new HttpParams().set('id', id);
            await this.http.get<any>(API_URL + 'api/Todo/get', { params: _httpParams }).subscribe(result => {
                this.$_todo.next(Object.assign({}, result));
                this.$_inProgress.next(false);
            });
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async getAll() {
        try {
            this.$_inProgress.next(true);
            await this.http.get<any>(API_URL + 'api/Todo/getall', {}).subscribe(result => {
                this.$_todos.next(Object.assign([], result));
                this.$_inProgress.next(false);
            });
            return new ServiceReturn(true, '', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async add(todo: TodoModel) {
        try {
            this.$_inProgress.next(true);
            await this.http.post<any>(API_URL + 'api/Todo/save', todo).subscribe(() => this.getAll());
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async modify(todo: TodoModel) {
        try {
            this.$_inProgress.next(true);
            await this.http.put<any>(API_URL + 'api/Todo/modify', todo).subscribe(() => this.getAll());
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async remove(id: string) {
        try {
            this.$_inProgress.next(true);
            await this.http.put<any>(API_URL + 'api/Todo/remove?id=' + id, {}).subscribe(() => this.getAll());
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async complete(id: string) {
        try {
            this.$_inProgress.next(true);
            await this.http.post<any>(API_URL + 'api/Todo/complete?id=' + id, {}).subscribe(() => this.getAll());
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    // !============================================================== SUB TODOS =============================================================

    async getSubOf(parentId: string) {
        try {
            this.$_inProgress.next(true);
            const _httpParams = new HttpParams().set('parentId', parentId);
            await this.http.get<any>(API_URL + 'api/SubTodo/getsubof', { params: _httpParams }).subscribe(result => {
                this.$_subTodo.next(Object.assign({}, result));
                this.$_inProgress.next(false);
            });
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