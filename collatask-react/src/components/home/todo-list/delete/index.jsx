import React from 'react';
import { Button } from 'react-bootstrap';
import DialogPromptComponent from '../../../dialog/prompt';
import { withTodoService } from '../../../../services/todo';

class DeleteButtonComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialogOpen: false, inProgress: false, error: null }
    }

    btnRemove_Clicked = () => this.setState({ dialogOpen: true });

    btnConfirm_Clicked = () => {
        this.setState({ inProgress: true });
        this.props.todoService.remove(this.props.todoId)
            .then(() => {
                this.setState({ dialogOpen: false });
                this.props.reloadTodos();
            })
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ inProgress: false }));
    }

    render() {
        return (
            <span>
                <Button className="mx-auto" variant="outline-danger" size="sm" disabled={this.state.inProgress || this.props.parentLoading} onClick={this.btnRemove_Clicked}>Remove</Button>
                <DialogPromptComponent
                    dialogShow={this.state.dialogOpen}
                    dialogClose={() => this.setState({ dialogOpen: false })}
                    targetMethod={this.btnConfirm_Clicked}
                    dialogMsg="Are you sure you want to remove selected item?"
                    error={this.state.error}
                    inProgress={this.state.inProgress}
                ></DialogPromptComponent>
            </span>
        );
    }
}

export default withTodoService(DeleteButtonComponent);