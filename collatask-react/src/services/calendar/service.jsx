export default class CalendarService {

    lCurrentDate = new Date();

    ComputeNewMonth(move) {
        var _currentdate = new Date(this.lCurrentDate);
        _currentdate.setMonth(_currentdate.getMonth() + move);
        return _currentdate;
    }

    nextCalendarMonth = () => this.ComputeNewMonth(1);

    prevCalendarMonth = () => this.ComputeNewMonth(-1);

    // Code below is from github which generates a sequence of dates per week within one month.
    // I modified some parts of the code (such as the starting day of the week, from Monday to Sunday)
    // to fit the project needs.
    // -Nor

    addDay = (date, days) => {
        var _result = new Date(date);
        _result.setDate(_result.getDate() + days);
        return _result;
    }

    buildWeek = (start, month) => {
        var _startDate = new Date(start), _days = [];
        var _loopMarker = new Date(_startDate.setHours(0, 0, 0, 0));
        for (var i = 0; i < 7; i++) {
            _days.push({ date: _loopMarker, month });
            _loopMarker = this.addDay(_loopMarker, 1);
        }
        return _days;
    }

    buildMonth = (month) => {
        var _currentMonth = new Date(month).getMonth();
        var _firstDay = new Date(month), _weeks = [];

        while (_firstDay.getDay() === 0 ? 7 : _firstDay.getDay() >= 1) {
            if (_firstDay.getDay() === 0)
                break;
            else _firstDay = this.addDay(_firstDay, -1);
        }

        for (var i = 0; i < 6; i++) {
            _weeks.push({ days: this.buildWeek(_firstDay, _currentMonth) });
            _firstDay = this.addDay(_firstDay, 7);
        }

        try {
            if (_weeks[5]['days'][0].month !== new Date(_weeks[5]['days'][0].date).getMonth())
                _weeks.splice(5, 1);
        } catch (error) {
            console.log('Error occured while removing last week of month.');
        }

        return _weeks;
    }

}