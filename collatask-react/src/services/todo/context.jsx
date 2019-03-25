import React from 'react';

const TodoContext = React.createContext(null);

export default TodoContext;

// higher order component
export const withTodoService = Component => props => (
    <TodoContext.Consumer>
        {todoService => <Component {...props} todoService={todoService}></Component>}
    </TodoContext.Consumer>
);