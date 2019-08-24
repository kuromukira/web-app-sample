import React from 'react';

const CalendarContext = React.createContext(null);

export default CalendarContext;

// higher order component
export const withCalendarService = Component => props => (
    <CalendarContext.Consumer>
        {calendarService => <Component {...props} calendarService={calendarService}></Component>}
    </CalendarContext.Consumer>
);