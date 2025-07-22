import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {



  return (
    <div className="welcome">
      <h1>Welcome to Mad Fingers!</h1>
      <p>We are glad to have you here. Click the button below to start a game</p>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
}

export default Welcome;