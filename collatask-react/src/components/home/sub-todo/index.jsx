import React from 'react';
import SubTodoListComponent from './list';
import { withTodoService } from '../../../services/todo';

class SubTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sub: this.props.subs, inProgress: false, error: null };
    }

    btnReloadSubs_Clicked = () => {

    }

    render() {
        return (
            <SubTodoListComponent
                subs={this.state.sub}
                reloadSubTodo={this.btnReloadSubs_Clicked}
                parentLoading={this.state.inProgress}>
            </SubTodoListComponent>
        );
    }

}

export default withTodoService(SubTodoComponent);