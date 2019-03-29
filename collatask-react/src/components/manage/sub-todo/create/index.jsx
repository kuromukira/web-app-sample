import React from 'react';
import { Button } from 'react-bootstrap';
import ManageSubTodoComponent from '../manage-dialog';
import { withTodoService } from '../../../../services/todo';

const INITIAL_STATE = {
    description: '',
    parentTodoId: '',
    isCompleted: false,
    // not related to todos model
    dialogShow: false,
    error: null,
    inProgress: false
}

class CreateSubTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onStateChange = (ev) => this.setState({ [ev.target.name]: ev.target.value, parentTodoId: this.props.parentId, error: null, inProgress: false });

    btnCloseDialog_Clicked = () => this.setState({ dialogShow: false, inProgress: false });

    btnOpenDialog_Clicked = () => this.setState({ dialogShow: true, inProgress: false });

    btnSaveTodo_Clicked = (ev) => {
        ev.preventDefault();
        this.setState({ inProgress: true });
        this.props.todoService.saveSub(this.state)
            .then(() => {
                this.props.reloadTodos();
                this.setState(INITIAL_STATE)
            })
            .catch((error) => this.setState({ error }))
    }

    render() {
        return (
            <span>
                <Button variant="outline-info" size="sm" disabled={this.state.inProgress || this.props.parentLoading} onClick={this.btnOpenDialog_Clicked}>New</Button>
                <ManageSubTodoComponent
                    title="Create Sub To-Do"
                    state={this.state}
                    closeDialog={this.btnCloseDialog_Clicked}
                    confirmDialog={this.btnSaveTodo_Clicked}
                    fieldChange={this.onStateChange}>
                </ManageSubTodoComponent>
            </span>
        );
    }
}

export default withTodoService(CreateSubTodoComponent);