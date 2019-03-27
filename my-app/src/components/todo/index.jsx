import React from 'react';
import TodoFormComponent from './form';
import TodoListComponent from './list';

class TodoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: [], todo: { id: 0, text: '' } };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const _newTodo = {
            id: this.state.todo.id,
            text: this.state.todo.text
        };
        this.setState(state => ({
            todos: state.todos.concat(_newTodo),
            todo: { id: 0, text: '' }
        }));
    }

    onTextChange = (number, text) => this.setState({ todo: { id: number, text } });

    render() {
        return (
            <section>
                <h4>Add to-do here</h4>
                <TodoFormComponent
                    id={this.state.todos.length + 1}
                    todo={this.state.todo}
                    onTodoTextChange={this.onTextChange}
                    onTodoSubmit={this.onSubmit}></TodoFormComponent>
                <TodoListComponent todos={this.state.todos}></TodoListComponent>
            </section >
        );
    }
}

export default TodoComponent;