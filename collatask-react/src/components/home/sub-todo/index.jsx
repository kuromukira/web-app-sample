import React from 'react';
import { withTodoService } from '../../../services/todo';

class SubTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sub: this.props.subs };
    }

    render() {
        return (
            <div> {this.props.inProgress ? "A" : "B"} </div>
        );
    }

}

export default withTodoService(SubTodoComponent);