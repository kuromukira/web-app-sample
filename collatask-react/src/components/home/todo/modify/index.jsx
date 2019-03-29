import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import ManageDialogComponent from '../manage-dialog';
import { withTodoService } from '../../../../services/todo';
import { localStoreKeys } from '../../../../constants/config';

const INITIAL_STATE = {
    todoId: '',
    description: '',
    addedBy: '',
    currentUser: localStorage.getItem(localStoreKeys.email),
    todoDate: '',
    isCompleted: false,
    sub: [],
    // not related to todos model
    dialogShow: false,
    error: null,
    inProgress: false
}

class ModifyButtonComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onStateChange = (ev) => this.setState({ [ev.target.name]: ev.target.value, error: null, success: false, inProgress: false });

    btnCloseDialog_Clicked = () => this.setState({ dialogShow: false, inProgress: false });

    btnOpenDialog_Clicked = () => {
        this.setState({ inProgress: true });
        this.props.todoService.get(this.props.todoId)
            .then((todo) => {
                this.setState({
                    dialogShow: true, error: null,
                    todoId: todo.todoId,
                    description: todo.description,
                    addedBy: todo.addedBy,
                    todoDate: moment(todo.todoDate).format('YYYY-MM-DD'),
                    isCompleted: todo.isCompleted,
                    sub: todo.sub
                });
            })
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ inProgress: false }))
    }

    btnSaveTodo_Clicked = (ev) => {
        ev.preventDefault();
        this.setState({ inProgress: true });
        this.props.todoService.modify(this.state)
            .then(() => {
                this.props.reloadTodos();
                this.setState(INITIAL_STATE)
            })
            .catch((error) => this.setState({ error }))
    }

    render() {
        return (
            <span>
                <Button className="mx-auto" variant="outline-secondary" size="sm" disabled={this.state.inProgress || this.props.parentLoading} onClick={this.btnOpenDialog_Clicked}>Modify</Button>
                <ManageDialogComponent
                    title="Edit To-Do"
                    state={this.state}
                    closeDialog={this.btnCloseDialog_Clicked}
                    confirmDialog={this.btnSaveTodo_Clicked}
                    fieldChange={this.onStateChange}>
                </ManageDialogComponent>
            </span>
        );
    }
}

export default withTodoService(ModifyButtonComponent);