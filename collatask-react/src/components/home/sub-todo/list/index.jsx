import './index.scss';
import React from 'react';
import CompleteButtonComponent from '../../shared/complete';
import RemoveButtonComponoent from '../../shared/delete';
import ModifySubTodoComponent from '../modify';
import { ListGroup, Row, Col } from 'react-bootstrap';

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
                                        {!todo.isCompleted &&
                                            <ModifySubTodoComponent
                                                todoId={todo.todoId}
                                                parentLoading={this.props.parentLoading}
                                                reloadSubTodo={this.props.reloadSubTodo} />
                                        }
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
            </div>
        );
    }

}

export default SubTodoListComponent;