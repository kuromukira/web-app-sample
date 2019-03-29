import './index.scss';
import React from 'react';
import SubTodoComponent from '../../../home/sub-todo';
import { Button, Container, Form, Row, Modal, Tabs, Tab } from 'react-bootstrap';

class ManageDialogComponent extends React.Component {

    isStateInvalid = () => this.props.state.description === '' || this.props.state.addedBy === '' || this.props.state.todoDate === '' || this.props.state.inProgress;

    render() {
        return (
            <Modal size="md" centered show={this.props.state.dialogShow}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-inline-flex p-2">
                    <Container>
                        <Tabs>
                            <Tab eventKey="infoTab" title="Info" className="tab-content-padding">
                                <Form onSubmit={this.props.confirmDialog}>
                                    <Form.Group as={Row} controlId="todo.description">
                                        <Form.Label><strong>Desciption</strong></Form.Label>
                                        <Form.Control size="sm" type="text" disabled={this.props.state.inProgress} name="description" value={this.props.state.description} onChange={this.props.fieldChange} placeholder="Description"></Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="todo.addedBy">
                                        <Form.Label><strong>Added By</strong></Form.Label>
                                        <Form.Control size="sm" type="email" disabled name="addedBy" value={this.props.state.addedBy} onChange={this.props.fieldChange} placeholder="Added By"></Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="todo.todoDate">
                                        <Form.Label><strong>Date</strong></Form.Label>
                                        <Form.Control size="sm" type="date" disabled={this.props.state.inProgress} name="todoDate" value={this.props.state.todoDate} onChange={this.props.fieldChange} placeholder="Date"></Form.Control>
                                    </Form.Group>
                                </Form>
                            </Tab>
                            <Tab eventKey="subTodoTab" title="Sub To-Do" className="tab-content-padding" disabled={this.props.state.todoId === ''}>
                                <SubTodoComponent
                                    todoId={this.props.state.todoId}
                                    subs={this.props.state.sub}
                                    inProgress={this.props.state.inProgress}
                                ></SubTodoComponent>
                            </Tab>
                        </Tabs>
                    </Container>
                    {this.props.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.props.state.error.message}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" disabled={this.props.state.inProgress} onClick={this.props.closeDialog}>Cancel</Button>
                    <Button variant="primary" size="sm" disabled={this.isStateInvalid()} onClick={this.props.confirmDialog}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ManageDialogComponent;