import React from 'react';
import { render } from '@testing-library/react';
import { UserDashboard } from '../Components/UserDashboard';


/**
 * Testing UserDashboard Component
 */

it('renders My Song Title', () => {
  const { getByText } = render(<UserDashboard />);
  expect(getByText('My Songs')).toBeInTheDocument();
});