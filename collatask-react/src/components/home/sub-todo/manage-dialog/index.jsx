import React from 'react';
import { Form, Row, Button, Modal, Container } from 'react-bootstrap';

class ManageSubTodoComponent extends React.Component {

    render() {
        return (
            <Modal size="sm" centered show={this.props.state.dialogShow}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-inline-flex p-2">
                    <Container>
                        <Form onSubmit={this.props.confirmDialog}>
                            <Form.Group as={Row} controlId="todo.description">
                                <Form.Label><strong>Desciption</strong></Form.Label>
                                <Form.Control size="sm" type="text" disabled={this.props.state.inProgress} name="description" value={this.props.state.description} onChange={this.props.fieldChange} placeholder="Description"></Form.Control>
                            </Form.Group>
                        </Form>
                    </Container>
                    {this.props.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.props.state.error.message}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" disabled={this.props.state.inProgress} onClick={this.props.closeDialog}>Cancel</Button>
                    <Button variant="primary" size="sm" disabled={this.props.state.description === '' || this.props.state.inProgress} onClick={this.props.confirmDialog}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ManageSubTodoComponent;