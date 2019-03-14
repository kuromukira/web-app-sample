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
                if (result.sub !== undefined && result.sub !== null)
                    this.$_subTodos.next(Object.assign([], result.sub));
                this.$_inProgress.next(false);
            });
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
                this.$_subTodos.next(Object.assign([], result));
                this.$_inProgress.next(false);
            });
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async getSub(id: string) {
        try {
            this.$_inProgress.next(true);
            const _httpParams = new HttpParams().set('id', id);
            await this.http.get<any>(API_URL + 'api/SubTodo/get', { params: _httpParams }).subscribe(result => {
                this.$_subTodo.next(Object.assign({}, result));
                this.$_inProgress.next(false);
            });
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async addSub(sub: TodoModel) {
        try {
            this.$_inProgress.next(true);
            await this.http.post<any>(API_URL + 'api/SubTodo/save', sub).subscribe(() => this.getSubOf(sub.parentTodoId));
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async modifySub(sub: TodoModel) {
        try {
            this.$_inProgress.next(true);
            await this.http.put<any>(API_URL + 'api/SubTodo/modify', sub).subscribe(() => this.getSubOf(sub.parentTodoId));
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async removeSub(parentId: string, subId: string) {
        try {
            this.$_inProgress.next(true);
            await this.http.put<any>(API_URL + 'api/SubTodo/remove?id=' + subId, {}).subscribe(() => this.getSubOf(parentId));
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async completeSub(parentId: string, subId: string) {
        try {
            this.$_inProgress.next(true);
            await this.http.post<any>(API_URL + 'api/SubTodo/complete?id=' + subId, {}).subscribe(() => this.getSubOf(parentId));
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

}