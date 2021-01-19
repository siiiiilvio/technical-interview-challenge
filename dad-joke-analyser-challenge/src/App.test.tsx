import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Choose number of jokes:/i);
  expect(linkElement).toBeInTheDocument();
});
