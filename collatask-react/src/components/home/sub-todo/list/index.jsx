import React from 'react';
import CompleteButtonComponent from '../../shared/complete';
import RemoveButtonComponoent from '../../shared/delete';
import { ListGroup, Row, Col } from 'react-bootstrap';

class SubTodoListComponent extends React.Component {

    render() {
        return (
            <ListGroup>
                {
                    this.props.subs.map(todo => (
                        <ListGroup.Item key={todo.todoId} variant={todo.isCompleted ? "success" : null}>
                            <Row>
                                <Col xs>
                                    {todo.description}
                                </Col>
                                <Col xs className="text-right">
                                    {!todo.isCompleted &&
                                        <CompleteButtonComponent
                                            reloadTodos={this.props.reloadSubTodo}
                                            todoId={todo.todoId}
                                            parentLoading={this.props.parentLoading} />
                                    }
                                    <RemoveButtonComponoent
                                        reloadTodos={this.props.reloadSubTodo}
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

export default SubTodoListComponent;