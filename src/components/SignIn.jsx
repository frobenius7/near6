import React from 'react';
// import banner from '../assets/big-spaceman.png';
import banner from '../assets/beard.svg';

export default function SignIn() {
  return (
    <div className="image-container">
      <img src={banner} style={{width: '50%' }} alt="Near to the moon" />
    </div>
        <h1>NEARvember challenge 5 - NFT minting frontent!</h1>
        <p>
          Please sign in.
        </p>

  );
}
