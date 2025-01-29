/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('<NumberOfEvents /> component', () => {
  let onNumberChangeMock;
  let setErrorAlertMock;

  beforeEach(() => {
    onNumberChangeMock = jest.fn();
    setErrorAlertMock = jest.fn(); // Mock function for setErrorAlert
    render(<NumberOfEvents onNumberChange={onNumberChangeMock} setErrorAlert={setErrorAlertMock} />);
  });

  test('renders with a textbox input', () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('has a default value of 32', () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(32);
  });

  test('updated value when user types in the textbox', async () => {
    const inputElement = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.clear(inputElement);
    await user.type(inputElement, '20');

    expect(inputElement).toHaveValue(20);
    expect(onNumberChangeMock).toHaveBeenCalledWith(20);
  });

  test('displays an error when an invalid number is entered', async () => {
    const inputElement = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.clear(inputElement);
    await user.type(inputElement, '-5');

    expect(setErrorAlertMock).toHaveBeenCalledWith("Please enter a number between 1 and 100.");
  });

  test('clears error when a valid number is entered', async () => {
    const inputElement = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.clear(inputElement);
    await user.type(inputElement, '20');

    expect(setErrorAlertMock).toHaveBeenCalledWith(""); // Error should be cleared for valid input
  });
});
