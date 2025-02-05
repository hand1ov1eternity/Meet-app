/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Show 32 events by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user has not specified the number of events', () => {
            AppComponent = render(<App />);
        });

        when('the app displays the events list', () => {
            // No action needed
        });

        then('32 events should be shown by default', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32); 
            });
        });
    });

    test('Change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;
        given('the user sees a field to specify the number of events', () => {
            AppComponent = render(<App />);
        });

        when('the user enters a new number and confirms', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const numberOfEventsInput = within(AppDOM).getByTestId('numberOfEventsInput');
            fireEvent.change(numberOfEventsInput, { target: { value: '3' } });
        });
        

        then('the app should display the specified number of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(3);
            });
        });
    });
});