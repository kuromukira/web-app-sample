import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTodoComponent } from '../manage/_manage.component';
import { CalendarService, TodoService } from 'src/app/services/_index.service';
import { DayDate } from 'src/app/models/calendar.model';

@Component({
    selector: 'calendar-main',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    lCurrentDate: Date;
    lWeeks: Object[] = [];
    lDaysOfweek: Object[] = [
        { name: "MON", color: "primary" },
        { name: "TUE", color: "primary" },
        { name: "WED", color: "primary" },
        { name: "THU", color: "primary" },
        { name: "FRI", color: "primary" },
        { name: "SAT", color: "accent" },
        { name: "SUN", color: "warn" }];

    constructor(private calendarService: CalendarService,
        private dialog: MatDialog) {
        this.lCurrentDate = new Date();
    }

    ngOnInit() {
        this.calendarService.Weeks.subscribe(weeks => this.lWeeks = weeks);
        let _year: number = this.lCurrentDate.getFullYear();
        let _month: number = this.lCurrentDate.getMonth() + 1; // Add 1 since getMonth returns the month index
        this.calendarService.buildMonth(new Date(_year + "/" + _month + "/1"));
    }

    btnAdd_Clicked(selectedDate: Date) {
        let _dayDate: DayDate = new DayDate();
        _dayDate.date = selectedDate;
        _dayDate.month = selectedDate.getMonth();
        this.dialog.open(AddTodoComponent, {
            width: '450px', disableClose: true,
            data: _dayDate
        }).afterClosed().subscribe(() => { });
    }

}
