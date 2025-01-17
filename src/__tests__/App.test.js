import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import App from './../App';

// eslint-disable-next-line no-undef
describe('<App /> component', () => {

  
    // eslint-disable-next-line no-undef
    test('renders list of events', () => {
        const AppDOM = render(<App />).container.firstChild;
      
        // eslint-disable-next-line no-undef
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
      });

      // eslint-disable-next-line no-undef
      test('render CitySearch', () => {
        const AppDOM = render(<App />).container.firstChild;
        // eslint-disable-next-line no-undef
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
        });

    });