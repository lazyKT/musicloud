import React from 'react';

export function ExpiredToken () {
    return (
        <div>
            <h4>You are getting this page because of one of the following reasons.</h4>
            <ul>
                <li>
                    You token has been Expired. Please Log out and Log In again.
                </li>
                <li>
                    No internet connection. Please refresh the page again!
                </li>
            </ul>
        </div>
    );
}