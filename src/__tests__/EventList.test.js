// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';


// eslint-disable-next-line no-undef
describe('<EventList /> component', () => {
    // eslint-disable-next-line no-undef
    test('renders correct number of events', () => {
        const EventListComponent = render(<EventList events={[{}, {}, {}, {}]} />);
        // eslint-disable-next-line no-undef
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
      });
});