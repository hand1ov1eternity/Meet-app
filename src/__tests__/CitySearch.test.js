// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import CitySearch from '../components/CitySearch';


// eslint-disable-next-line no-undef
describe('<CitySearch /> component', () => {
  // eslint-disable-next-line no-undef
  test('renders text input', () => {
    const CitySearchComponent = render(<CitySearch />);
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    // eslint-disable-next-line no-undef
    expect(cityTextBox).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(cityTextBox).toHaveClass('city');
  });
});