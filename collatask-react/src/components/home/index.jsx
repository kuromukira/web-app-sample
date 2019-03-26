import React from 'react';
import { withAuthorization } from '../../services/session';
import { withTodoService } from '../../services/todo';
import TodoListComponent from '../home/todo-list';
import { Row, Col, Button, Container } from 'react-bootstrap';

class HomePageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: [], inProgress: false, error: null }
    }

    componentDidMount() {
        this.btnReload_Clicked();
    }

    btnReload_Clicked = () => {
        this.setState({ todos: [], inProgress: true, error: null });
        this.props.todoService.getAll()
            .then((result) => {
                this.setState({ todos: result });
            })
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ inProgress: false }));
    }

    btnAdd_Clicked = () => { }

    render() {
        return (
            <section>
                <Container>
                    <Row className="text-right">
                        <Col>
                            <Button variant="outline-info" size="sm" disabled={this.state.inProgress} onClick={this.btnAdd_Clicked}>New</Button>
                            <Button variant="outline-dark" size="sm" disabled={this.state.inProgress} onClick={this.btnReload_Clicked}>Refresh</Button>
                        </Col>
                    </Row>
                    {this.state.error &&
                        <Row><Col xs><div className="flex-fill alert alert-danger" role="alert">{this.state.error.message}</div></Col></Row>
                    }
                    <Row>
                        <Col xs justify="center">
                            <TodoListComponent todos={this.state.todos} reloadTodos={this.btnReload_Clicked} />
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

// Route protection
const condition = authUser => !!authUser;
export default withAuthorization(condition)(withTodoService(HomePageComponent));