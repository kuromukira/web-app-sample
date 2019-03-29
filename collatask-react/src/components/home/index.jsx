import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { withAuthorization } from '../../services/session';
import { withTodoService } from '../../services/todo';
import TodoListComponent from '../home/todo-list';
import CreateTodoComponent from '../home/todo-list/create';

class HomePageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: [], inProgress: false, error: null }
    }

    componentDidMount() {
        this.btnReload_Clicked();
    }

    btnReload_Clicked = () => {
        this.setState({ inProgress: true, error: null });
        this.props.todoService.getAll()
            .then((result) => this.setState({ todos: result }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ inProgress: false }));
    }

    render() {
        return (
            <section>
                <Container>
                    <Row className="text-right">
                        <Col>
                            <CreateTodoComponent reloadTodos={this.btnReload_Clicked} parentLoading={this.state.inProgress} />
                            <Button variant="outline-dark" size="sm" disabled={this.state.inProgress} onClick={this.btnReload_Clicked}>Refresh</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs>
                            {this.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.state.error.message}</div>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs justify="center">
                            <TodoListComponent todos={this.state.todos} parentLoading={this.state.inProgress} reloadTodos={this.btnReload_Clicked} />
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