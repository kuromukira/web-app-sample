import { Component, Input, OnInit } from '@angular/core';
import { TodoService, CalendarService } from 'src/app/services/_index.service';

@Component({
    selector: 'calendar-toolbar',
    templateUrl: './toolbar.component.html'
})
export class CalendarToolbarComponent implements OnInit {

    inProgress: boolean = false;
    lCurrentDate: Date;

    @Input() set currentDate(date: Date) {
        this.lCurrentDate = new Date(date);
    }

    constructor(private todoService: TodoService, private calendarService: CalendarService) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
    }

    btnPrevMonth_Clicked() {
        this.calendarService.prevCalendarMonth();
    }

    btnNextMonth_Clicked() {
        this.calendarService.nextCalendarMonth();
    }

}
