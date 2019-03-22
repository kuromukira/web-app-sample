import React from 'react';

class TodoListComponent extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.todos.map(todo => (
                        <li key={todo.id}>
                            <span>{todo.text}</span>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default TodoListComponent;