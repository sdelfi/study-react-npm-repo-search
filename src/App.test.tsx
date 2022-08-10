import { screen } from '@testing-library/react';
import React from 'React';

import App from './App';
import { renderWithProviders } from './utils/test-utils';

describe('Rendering tests', () => {
  test('renders app app title', () => {
    renderWithProviders(<App />);
    const appTitleElement = screen.getByText(/NPM package search/i);
    expect(appTitleElement).toBeInTheDocument();
  });

  test('renders form element', () => {
    const { container } = renderWithProviders(<App />);
    expect(container.getElementsByClassName('form').length).toBe(1);
  });

  test('renders form input element', () => {
    const { container } = renderWithProviders(<App />);
    expect(container.getElementsByClassName('formInput').length).toBe(1);
  });

  test('renders list element', () => {
    const { container } = renderWithProviders(<App />);
    expect(container.getElementsByClassName('list').length).toBe(1);
  });
});
