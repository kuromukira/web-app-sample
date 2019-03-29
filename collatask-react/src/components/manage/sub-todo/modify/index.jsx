import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import ManageSubTodoComponent from '../manage-dialog';
import { withTodoService } from '../../../../services/todo';

const INITIAL_STATE = {
    todoId: '',
    description: '',
    parentTodoId: '',
    addedBy: '',
    todoDate: '',
    isCompleted: false,
    // not related to todos model
    dialogShow: false,
    error: null,
    inProgress: false
}

class ModifySubTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onStateChange = (ev) => this.setState({ [ev.target.name]: ev.target.value, error: null, inProgress: false });

    btnCloseDialog_Clicked = () => this.setState({ dialogShow: false, inProgress: false });

    btnOpenDialog_Clicked = () => {
        this.setState({ inProgress: true });
        this.props.todoService.getSub(this.props.todoId)
            .then((todo) => {
                this.setState({
                    dialogShow: true, error: null,
                    todoId: todo.todoId,
                    parentTodoId: todo.parentTodoId,
                    description: todo.description,
                    addedBy: todo.addedBy,
                    todoDate: moment(todo.todoDate).format('YYYY-MM-DD'),
                    isCompleted: todo.isCompleted
                });
            })
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ inProgress: false }))
    }

    btnSaveTodo_Clicked = (ev) => {
        ev.preventDefault();
        this.setState({ inProgress: true });
        this.props.todoService.modifySub(this.state)
            .then(() => {
                this.props.reloadSubTodo();
                this.setState(INITIAL_STATE)
            })
            .catch((error) => this.setState({ error }))
    }

    render() {
        return (
            <span>
                <Button className="mx-auto" variant="outline-secondary" size="sm" disabled={this.state.inProgress || this.props.parentLoading} onClick={this.btnOpenDialog_Clicked}>Modify</Button>
                <ManageSubTodoComponent
                    title="Edit Sub To-Do"
                    state={this.state}
                    closeDialog={this.btnCloseDialog_Clicked}
                    confirmDialog={this.btnSaveTodo_Clicked}
                    fieldChange={this.onStateChange}>
                </ManageSubTodoComponent>
            </span>
        );
    }
}

export default withTodoService(ModifySubTodoComponent);