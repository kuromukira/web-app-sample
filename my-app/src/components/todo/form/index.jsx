import React from 'react';

class TodoFormComponent extends React.Component {

    onValueChange(number, e) {
        this.props.onTodoTextChange(number, e.target.value);
    }

    render() {
        const _newId = this.props.id;
        const _newTodo = this.props.todo;
        return (
            <div>
                <form onSubmit={this.props.onTodoSubmit}>
                    <label htmlFor="new-todo">To-Do Text Here:</label>
                    <input id="new-todo" value={_newTodo.text} onChange={this.onValueChange.bind(this, _newId)}></input>
                    <button>Add #{_newId}</button>
                </form>
            </div>
        );
    }
}

export default TodoFormComponent;