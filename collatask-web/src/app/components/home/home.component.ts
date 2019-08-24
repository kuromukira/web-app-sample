import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/_index.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

    inProgress: boolean = false;
    lTodos: TodoModel[] = [];

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.todoService.$_todos.subscribe(data => this.lTodos = data === undefined || data === null ? [] : data);
    }

    ngOnDestroy() {
        this.todoService.clearSubjects();
    }

}
