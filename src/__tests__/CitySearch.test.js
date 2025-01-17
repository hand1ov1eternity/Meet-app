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
  });