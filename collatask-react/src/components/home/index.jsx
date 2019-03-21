import React from 'react';
import { withAuthorization } from '../../services/session';

function HomePageComponent() {
    return (
        <div>
            <h4>Home Page</h4>
        </div>
    );
}

// Route protection
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePageComponent);