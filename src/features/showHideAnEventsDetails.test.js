/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'; 
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('Event details are hidden by default', ({ given, when, then, and }) => {
        let AppComponent;
        given('the user opens the Meet app', () => {
          AppComponent = render(<App />);
        });

        when('the event list is displayed', async () => {
          const AppDOM = AppComponent.container.firstChild;
          const EventListDOM = AppDOM.querySelector('#event-list');
        
          await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            console.log('Number of events rendered:', EventListItems.length); // Debugging line
            expect(EventListItems.length).toBeGreaterThan(0);
          });
        });
        

        then('each event should show only its basic information', async () => {
          const AppDOM = AppComponent.container.firstChild;
          const eventDetails = AppDOM.querySelector('.details');
          expect(eventDetails).not.toBeInTheDocument();
          });

          and('the event details should be hidden', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();
          });

    });

    test('User can expand an event to see details', ({ given, when, then }) => {
      let AppComponent;
      given('the user is viewing the list of events', async () => {
        AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
      
            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            });

      });

      when('the user clicks on the "Show Details" button for an event', async () => {
        const AppDOM = AppComponent.container.firstChild;
      
        await waitFor(() => {
          const EventListDOM = AppDOM.querySelector('#event-list');
          expect(EventListDOM).toBeInTheDocument(); // Ensure event list exists
        });
      
        await waitFor(() => {
          const showDetailsButtons = within(AppDOM).queryAllByText(/show details/i); 
          expect(showDetailsButtons.length).toBeGreaterThan(0); // Ensure buttons exist
          fireEvent.click(showDetailsButtons[0]);
        });
      });

      then('the event details should be displayed', async () => {
          const AppDOM = AppComponent.container.firstChild;
          const eventDetails = AppDOM.querySelector('.details');
          expect(eventDetails).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
      let EventComponent;
      let allEvents;
      given('the user has expanded an event to see details', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const EventComponent = render(<Event event={allEvents[0]} />)
        const showDetails = EventComponent.queryByText('Show details');
        await user.click(showDetails);
      });

      when('the user clicks on the "Hide Details" button for that event', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const EventComponent = render(<Event event={allEvents[0]} />)
        const hideDetails = EventComponent.queryByText('Hide details');
        await user.click(hideDetails);
      });

      then('the event details should be hidden again',async () => {
        let AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
          const eventDetails = AppDOM.querySelector('.details');
          expect(eventDetails).not.toBeInTheDocument();
      });
    });

});