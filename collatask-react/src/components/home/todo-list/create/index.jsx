import React from 'react';
import { Button, Modal, Container, Form } from 'react-bootstrap';
import { withTodoService } from '../../../../services/todo';
import { localStoreKeys } from '../../../../constants/config';

const INITIAL_STATE = {
    todoId: '',
    description: '',
    addedBy: localStorage.getItem(localStoreKeys.email),
    currentUser: localStorage.getItem(localStoreKeys.email),
    todoDate: '',
    isCompleted: false,
    // not related to todos model
    dialogShow: false,
    error: null,
    inProgress: false
}

class CreateTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onStateChange = (ev) => this.setState({ [ev.target.name]: ev.target.value, error: null, success: false, inProgress: false });

    isStateInvalid = () => this.state.description === '' || this.state.addedBy === '' || this.state.todoDate === '' || this.state.inProgress;

    btnCloseDialog_Clicked = () => this.setState({ dialogShow: false, inProgress: false });

    btnOpenDialog_Clicked = () => this.setState({ dialogShow: true, inProgress: false });

    btnSaveTodo_Clicked = (ev) => {
        ev.preventDefault();

        this.props.todoService.save(this.state)
            .then(result => {
                this.props.reloadTodos();
                this.setState(INITIAL_STATE)
            })
            .catch((error) => this.setState({ error }))
    }

    render() {
        return (
            <span>
                <Button variant="outline-info" size="sm" disabled={this.state.inProgress} onClick={this.btnOpenDialog_Clicked}>New</Button>
                <Modal size="sm" centered show={this.state.dialogShow}>
                    <Modal.Header>
                        <Modal.Title>Create To-Do</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex">
                        <Container>
                            <Form onSubmit={this.btnSaveTodo_Clicked}>
                                <Form.Group>
                                    <Form.Label><strong>Description</strong></Form.Label>
                                    <Form.Control size="sm" required type="text" disabled={this.state.inProgress} name="description" value={this.state.description} onChange={this.onStateChange} placeholder="Description"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Added By</strong></Form.Label>
                                    <Form.Control size="sm" readOnly type="text" name="addedBy" value={this.state.addedBy} onChange={this.onStateChange} placeholder="Email"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Date</strong></Form.Label>
                                    <Form.Control size="sm" required type="date" disabled={this.state.inProgress} name="todoDate" value={this.state.todoDate} onChange={this.onStateChange} placeholder="Date"></Form.Control>
                                </Form.Group>
                            </Form>
                            {this.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.state.error.message}</div>}
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" size="sm" onClick={this.btnCloseDialog_Clicked}>Cancel</Button>
                        <Button variant="primary" size="sm" disabled={this.isStateInvalid()} onClick={this.btnSaveTodo_Clicked}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    }
}

export default withTodoService(CreateTodoComponent);