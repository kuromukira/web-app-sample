import React from 'react';
import { Button } from 'react-bootstrap';
import { withTodoService } from '../../../../services/todo';

class ModifyButtonComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialogOpen: false, error: null, todo: null }
    }

    btnComplete_Clicked = () => this.setState({ dialogOpen: true });

    btnConfirm_Clicked = () => {
        this.props.reloadTodos();
    }

    render() {
        return (
            <span>
                <Button className="mx-auto" variant="outline-secondary" size="sm" onClick={this.btnComplete_Clicked}>Modify</Button>

            </span>
        );
    }
}

export default withTodoService(ModifyButtonComponent);