/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';


describe('<NumberOfEvents /> component', () => {
  let onNumberChangeMock;
  beforeEach(() => {
    onNumberChangeMock = jest.fn();
    render(<NumberOfEvents onNumberChange={onNumberChangeMock} />);
  });

  test('renders with a textbox input', () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('has a default value of 32',  () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(32);
  });

  test('updated value when user types in the textbox', async () => {
   const inputElement = screen.getByRole('textbox');
   const user = userEvent.setup();

   await user.clear(inputElement); // Clears the input field
await user.type(inputElement, '20'); // Types '20' into the input field
expect(inputElement).toHaveValue(20); // Expects the input to now have the value 20
expect(onNumberChangeMock).toHaveBeenCalledWith(20); // Verifies callback is called with 20
  });
});