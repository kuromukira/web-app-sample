import { Component, Input } from '@angular/core';

@Component({
    selector: 'calendar-toolbar',
    templateUrl: './toolbar.component.html'
})
export class CalendarToolbarComponent {

    lCurrentDate: Date;

    @Input() set currentDate(date: Date) {
        this.lCurrentDate = new Date(date);
    }

    constructor() { }

}
