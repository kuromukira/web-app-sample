import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddTodoComponent } from '../manage/_manage.component';
import { CalendarService } from 'src/app/services/_index.service';
import { DayDate } from 'src/app/models/calendar.model';

@Component({
    selector: 'calendar-main',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    lCurrentDate: Date = new Date();
    lWeeks: Object[] = [];
    lDaysOfweek: Object[] = [
        { name: "SUN", color: "warn" },
        { name: "MON", color: "primary" },
        { name: "TUE", color: "primary" },
        { name: "WED", color: "primary" },
        { name: "THU", color: "primary" },
        { name: "FRI", color: "primary" },
        { name: "SAT", color: "accent" }];

    lConnectedDropList: string[] = [];

    constructor(private calendarService: CalendarService, private dialog: MatDialog) { }

    ngOnInit() {
        this.calendarService.CurrentCalendarDate.subscribe(calendarDate => {
            this.lCurrentDate = calendarDate;
            let _year: number = calendarDate.getFullYear();
            let _month: number = calendarDate.getMonth() + 1; // Add 1 since getMonth returns the month index
            this.calendarService.buildMonth(new Date(_year + "/" + _month + "/1"));
        });
        this.calendarService.Weeks.subscribe(weeks => {
            this.lWeeks = weeks;

            // Create a list of formated day names to create a connected dragdrop list
            this.lConnectedDropList = [];
            for (var i = 0; i < weeks.length; i++) {
                let _days: any = weeks[i];
                for (var d = 0; d < _days.days.length; d++)
                    this.lConnectedDropList.push(_days.days[d].name);
            }
        });
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
