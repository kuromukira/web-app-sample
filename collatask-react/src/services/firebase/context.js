import React from 'react';

const FirebaseContext = React.createContext(null);

export default FirebaseContext;

// higher order component
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase}></Component>}
    </FirebaseContext.Consumer>
);