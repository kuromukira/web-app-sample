import React from 'react';
import { withTodoService } from '../../services/todo';
import { withCalendarService } from '../../services/calendar';

class CalendarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sub: this.props.subs };
    }

    componentDidMount() {
        var _month = new Date().getMonth() + 1;
        var _year = new Date().getFullYear();
        console.log(this.props.calendarService.buildMonth(_year + "/" + _month + "/1"));
    }

    render() {
        return (
            <div> I am a calendar </div>
        );
    }

}

export default withTodoService(withCalendarService(CalendarComponent));