import { Injectable } from '@angular/core';
import { DayDate } from 'src/app/models/calendar.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CalendarService {

    public Weeks: BehaviorSubject<Object[]> = new BehaviorSubject([]);
    public CurrentCalendarDate: BehaviorSubject<Date> = new BehaviorSubject(new Date());

    constructor() { }

    private ComputeNewMonth(move: number): Date {
        let _currentDate = new Date(this.CurrentCalendarDate.value);
        _currentDate.setMonth(_currentDate.getMonth() + move);
        return _currentDate;
    }

    public nextCalendarMonth() {
        this.CurrentCalendarDate.next(this.ComputeNewMonth(1));
    }

    public prevCalendarMonth() {
        this.CurrentCalendarDate.next(this.ComputeNewMonth(-1));
    }

    // Code below is from github which generates a sequence of dates per week within one month.
    // I modified some parts of the code (such as the starting day of the week, from Monday to Sunday)
    // to fit the project needs.
    // -Nor

    /**
     * Add days
     * @param date Date to be modified
     * @param days Number of days to add
     */
    public addDay(date: Date, days: number = 1): Date {
        let _result = new Date(date);
        _result.setDate(_result.getDate() + days);
        return _result;
    }

    /**
     * Generates a sequence of days for each week of the month
     * @param start Week start
     * @param month Current month
     */
    public buildWeek(start: Date, month: number): DayDate[] {
        let _days: DayDate[] = [];
        let _loopMarker: Date = new Date(start.setHours(0, 0, 0, 0));
        for (var i = 0; i < 7; i++) {
            _days.push({ date: _loopMarker, month });
            _loopMarker = this.addDay(_loopMarker, 1);
        }
        return _days;
    }

    /**
     * Generates a sequence of weeks for the current month
     */
    public buildMonth(currentMonth: Date): void {
        let _currentMonth: number = currentMonth.getMonth();
        let _firstDay: Date = currentMonth;
        let _weeks: Object[] = [];

        while (_firstDay.getDay() === 0 ? 7 : _firstDay.getDay() >= 1) {
            if (_firstDay.getDay() === 0) // to start with sunday [0]
                break;
            else _firstDay = this.addDay(_firstDay, -1);
        }

        for (let i = 0; i < 6; i++) {
            _weeks.push({ days: this.buildWeek(_firstDay, _currentMonth) });
            _firstDay = this.addDay(_firstDay, 7);
        }

        try {
            if (_weeks[5]['days'][0].month !== new Date(_weeks[5]['days'][0].date).getMonth())
                _weeks.splice(5, 1);
        } catch (error) {
            console.log('Error occured while removing last week of month.');
        }

        // Update observable
        this.Weeks.next(Object.assign([], _weeks));
    }

}