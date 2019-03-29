import React from 'react';
import { withTodoService } from '../../services/todo';

class CalendarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sub: this.props.subs };
    }

    render() {
        return (
            <div> I am a calendar </div>
        );
    }

}

export default withTodoService(CalendarComponent);