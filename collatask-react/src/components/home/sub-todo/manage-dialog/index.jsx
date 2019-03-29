import React from 'react';
import { withTodoService } from '../../../../services/todo';
import { Form, Row, Button, Modal, Container } from 'react-bootstrap';

const INITIAL_STATE = {
    todoId: '',
    description: '',
    addedBy: '',
    parentTodoId: '',
    todoDate: '',
    isCompleted: false,
    // not related to todos model
    error: null,
    inProgress: false
}

class ManageSubTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onStateChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value, parentTodoId: this.props.parentTodoId, error: null, inProgress: false });
        if (this.props.model !== undefined && this.props.model !== null) {
            this.setState({
                todoId: this.props.model.todoId,
                addedBy: this.props.model.addedBy,
                todoDate: this.props.model.todoDate,
                isCompleted: this.props.model.isCompleted
            });
        }
    }

    saveComplete() {
        this.props.reloadSubTodo();
        this.setState(INITIAL_STATE);
        this.props.closeDialog();
    }

    btnSave_Clicked = (ev) => {
        this.setState({ inProgress: true });
        if (this.props.model !== undefined && this.props.model !== null)
            this.props.todoService.modifySub(this.state)
                .then(() => this.saveComplete())
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({ inProgress: false }));
        else this.props.todoService.saveSub(this.state)
            .then(() => this.saveComplete())
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ inProgress: false }));
        ev.preventDefault();
    }

    render() {
        return (
            <Modal size="sm" centered show={this.props.dialogShow}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-inline-flex p-2">
                    <Container>
                        <Form onSubmit={this.btnSave_Clicked}>
                            <Form.Group as={Row} controlId="todo.description">
                                <Form.Label><strong>Desciption</strong></Form.Label>
                                <Form.Control size="sm" type="text" disabled={this.state.inProgress} name="description" value={this.state.description} onChange={this.onStateChange} placeholder="Description"></Form.Control>
                            </Form.Group>
                        </Form>
                    </Container>
                    {this.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.state.error.message}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" disabled={this.state.inProgress} onClick={this.props.closeDialog}>Cancel</Button>
                    <Button variant="primary" size="sm" disabled={this.state.description === '' || this.state.inProgress} onClick={this.btnSave_Clicked}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withTodoService(ManageSubTodoComponent);