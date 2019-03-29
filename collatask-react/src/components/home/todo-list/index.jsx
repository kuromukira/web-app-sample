import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import CompleteButtonComponent from './complete';
import RemoveButtonComponoent from './delete';
import ModifyButtonComponent from './modify';

class TodoListComponent extends React.Component {

    render() {
        return (
            <ListGroup>
                {
                    this.props.todos.map(todo => (
                        <ListGroup.Item key={todo.todoId} variant={todo.isCompleted ? "success" : null}>
                            <Row>
                                <Col xs>
                                    {todo.description}
                                </Col>
                                <Col xs className="text-right">
                                    <ModifyButtonComponent
                                        todoId={todo.todoId}
                                        parentLoading={this.props.parentLoading}
                                        reloadTodos={this.props.reloadTodos} />
                                    {!todo.isCompleted &&
                                        <CompleteButtonComponent
                                            reloadTodos={this.props.reloadTodos}
                                            todoId={todo.todoId}
                                            parentLoading={this.props.parentLoading} />
                                    }
                                    <RemoveButtonComponoent
                                        reloadTodos={this.props.reloadTodos}
                                        todoId={todo.todoId}
                                        parentLoading={this.props.parentLoading} />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        );
    }
}

export default TodoListComponent;