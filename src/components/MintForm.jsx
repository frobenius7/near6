import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function MintForm({ onMintSubmit, currentUser }) {
  return (
    <form onSubmit={onMintSubmit}>
        <fieldset id="fieldset">
          <p>Mint</p>
          <p className="highlight">
            <label htmlFor="amount">Amount:</label>
            <input
              autoComplete="off"
              defaultValue={'111'}
              id="amount"
              max={1000}
              // max={Big(currentUser.balance).div(10 ** 24)}
              min="0"
              step="1"
              type="number"
            />
            <label htmlFor="amount">BRD</label>
          </p>
          <button type="submit">
            Mint
          </button>
        </fieldset>
    </form>
  );
}

MintForm.propTypes = {
  onMintSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  })
};
