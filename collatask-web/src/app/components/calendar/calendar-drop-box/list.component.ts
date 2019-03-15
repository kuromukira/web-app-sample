import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/_index.service';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
    selector: 'calendar-drop-box',
    templateUrl: './list.component.html'
})
export class CalendarDropListComponent implements OnInit {

    lTodosPerDay: TodoModel[] = [];
    inProgress: boolean;
    private lBoxDate: Date;

    @Input() set boxDate(date: Date) {
        this.lBoxDate = new Date(date);
    }

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.todoService.$_todos.subscribe(data => {
            this.lTodosPerDay = [];
            for (let i = 0; i < data.length; i++) {
                if (new Date(data[i].todoDate).toDateString() == this.lBoxDate.toDateString())
                    this.lTodosPerDay.push(data[i]);
            }
        });
    }

}
