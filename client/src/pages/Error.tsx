import React from 'react';
import Header from './Header';

function Error() {
  return (
    <div>
      <Header/>
      <div className="evaluation">
        <h2>Oops! Page not found! You may have used an invalid token. Please contact the administrator.</h2>
      </div>
    </div>
  );
}

export default Error;