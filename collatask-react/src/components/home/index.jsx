import React from 'react';
import { withAuthorization } from '../../services/session';
import { withTodoService } from '../../services/todo';

class HomePageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] }
    }

    // componentDidMount() {
    //     this.btnReload_Clicked();
    // }

    // btnReload_Clicked = () => {
    //     this.props.todoService.getAll()
    //         .then((result) => {
    //             this.setState({ todos: result });
    //         })
    // }

    render() {
        return (
            <div>
                <h4>Home Page</h4>
                {/* <button onClick={this.btnReload_Clicked}>Refresh</button>
                <ul>
                    {
                        this.state.todos.map(todo => (
                            <li key={todo.todoId}>
                                <span>{todo.description}</span>
                            </li>
                        ))
                    }
                </ul> */}
            </div>
        );
    }
}

// Route protection
const condition = authUser => !!authUser;
export default withAuthorization(condition)(withTodoService(HomePageComponent));