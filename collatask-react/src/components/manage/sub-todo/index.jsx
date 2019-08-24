import React from 'react';
import SubTodoListComponent from './list';
import CreateSubTodoComponent from './create';
import { withTodoService } from '../../../services/todo';
import { Button, Row, Container, Col } from 'react-bootstrap';

class SubTodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sub: this.props.subs, dialogShow: false, inProgress: false, error: null };
    }

    btnReloadSubs_Clicked = () => {
        this.setState({ inProgress: true })
        this.props.todoService.getSubOf(this.props.parentId)
            .then((result) => this.setState({ sub: result }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ inProgress: false }));
    }

    render() {
        return (
            <Container>
                <Row className="text-right">
                    <Col xs>
                        {!this.props.completed && <CreateSubTodoComponent reloadTodos={this.btnReloadSubs_Clicked} parentId={this.props.parentId} parentLoading={this.state.inProgress} />}
                        <Button variant="outline-dark" size="sm" disabled={this.state.inProgress} onClick={this.btnReloadSubs_Clicked}>Refresh</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SubTodoListComponent
                            subs={this.state.sub}
                            parentTodoId={this.props.parentId}
                            reloadSubTodo={this.btnReloadSubs_Clicked}
                            parentLoading={this.state.inProgress}>
                        </SubTodoListComponent>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default withTodoService(SubTodoComponent);