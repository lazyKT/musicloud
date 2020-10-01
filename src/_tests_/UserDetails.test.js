import React from 'react';
import { render } from '@testing-library/react';
import UserDetails from '../Components/UserDetails';


/**
 * Testing UserDetails Component
 */
it('testing user details', () => {
    const { getByText } = render(<UserDetails/>);
    expect(getByText('Email Address')).toBeInTheDocument();
})