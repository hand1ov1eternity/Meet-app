import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';


describe('<EventList /> component', () => {
    test('renders correct number of events', () => {
        const EventListComponent = render(<EventList events={[{}, {}, {}, {}]} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
      });
});