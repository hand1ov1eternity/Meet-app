// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';


// eslint-disable-next-line no-undef
describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    // eslint-disable-next-line no-undef
    beforeEach(() => {
      CitySearchComponent = render(<CitySearch />);
    });
    // eslint-disable-next-line no-undef
    test('renders text input', () => {
      const cityTextBox = CitySearchComponent.queryByRole('textbox');
      // eslint-disable-next-line no-undef
      expect(cityTextBox).toBeInTheDocument();
      // eslint-disable-next-line no-undef
      expect(cityTextBox).toHaveClass('city');
    });
  
  
    // eslint-disable-next-line no-undef
    test('suggestions list is hidden by default', () => {
      const suggestionList = CitySearchComponent.queryByRole('list');
      // eslint-disable-next-line no-undef
      expect(suggestionList).not.toBeInTheDocument();
    });
  
  
    // eslint-disable-next-line no-undef
    test('renders a list of suggestions when city textbox gains focus', async () => {
      const user = userEvent.setup();
      const cityTextBox = CitySearchComponent.queryByRole('textbox');
      await user.click(cityTextBox);
      const suggestionList = CitySearchComponent.queryByRole('list');
      // eslint-disable-next-line no-undef
      expect(suggestionList).toBeInTheDocument();
      // eslint-disable-next-line no-undef
      expect(suggestionList).toHaveClass('suggestions');
    });

    // eslint-disable-next-line no-undef
    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        // eslint-disable-next-line no-undef
        const allEvents = await getEvents();
        // eslint-disable-next-line no-undef
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
    
    
        // user types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");
    
    
        // filter allLocations to locations matching "Berlin"
        const suggestions = allLocations? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }): [];
    
    
        // get all <li> elements inside the suggestion list
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        // eslint-disable-next-line no-undef
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
          // eslint-disable-next-line no-undef
          expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
      });
  });