import './index.scss';
import React from 'react';
import CompleteButtonComponent from '../../shared/complete';
import RemoveButtonComponoent from '../../shared/delete';
import ManageSubTodoComponent from '../manage-dialog';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

class SubTodoListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todo: null, dialogShow: false };
    }

    btnModify_Clicked = (todo) => this.setState({ todo, dialogShow: true });

    btnCloseModify_Clicked = () => this.setState({ dialogShow: false });

    render() {
        return (
            <div>
                <ListGroup className="sub-todo-list-height">
                    {this.props.subs &&
                        this.props.subs.map(todo => (
                            <ListGroup.Item key={todo.todoId} variant={todo.isCompleted ? "success" : null}>
                                <Row>
                                    <Col xs>
                                        {todo.description}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs className="text-right">
                                        {!todo.isCompleted && <Button variant="outline-secondary" size="sm" disabled={this.props.parentLoading} onClick={(e) => this.btnModify_Clicked(todo, e)}>Modify</Button>}
                                        {!todo.isCompleted &&
                                            <CompleteButtonComponent
                                                reloadTodos={this.props.reloadSubTodo}
                                                subTodoId={todo.todoId}
                                                parentLoading={this.props.parentLoading} />
                                        }
                                        <RemoveButtonComponoent
                                            reloadTodos={this.props.reloadSubTodo}
                                            subTodoId={todo.todoId}
                                            parentLoading={this.props.parentLoading} />
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <span>
                    <ManageSubTodoComponent
                        title="Edit Sub-Todo"
                        model={this.state.todo}
                        parentTodoId={this.props.parentTodoId}
                        dialogShow={this.state.dialogShow}
                        reloadSubTodo={this.props.reloadSubTodo}
                        closeDialog={this.btnCloseModify_Clicked}>
                    </ManageSubTodoComponent>
                </span>
            </div>
        );
    }

}

export default SubTodoListComponent;