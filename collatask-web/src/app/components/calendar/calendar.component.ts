import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/_index.service';

@Component({
    selector: 'calendar-main',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    lCurrentDate: Date;
    lWeeks: Object[] = [];
    lDaysOfweek: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    constructor(private calendarService: CalendarService) {
        this.lCurrentDate = new Date();
    }

    ngOnInit() {
        this.calendarService.Weeks.subscribe(weeks => this.lWeeks = weeks);
        this.calendarService.buildMonth(new Date('2019-03-01'));
    }

}
