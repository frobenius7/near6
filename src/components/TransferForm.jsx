import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function TransferForm({ onTransferSubmit, balance }) {
  return (
    <form onSubmit={onTransferSubmit}>
        <fieldset id="fieldset">
          <p>Transfer</p>
          <p className="highlight">
            <label htmlFor="receiverId">Receiver:</label>
            <input
              autoComplete="off"
              autoFocus
              id="receiverId"
              required
            />
          </p>
          <p className="highlight">
            <label htmlFor="amount">Amount:</label>
            <input
              autoComplete="off"
              defaultValue={'0'}
              id="amount"
              max={Big(balance).div(10 ** 24)}
              min="0"
              step="1"
              type="number"
            />
            <label htmlFor="amount">BRD</label>
          </p>
          <button type="submit">
            Transfer
          </button>
        </fieldset>
    </form>
  );
}

TransferForm.propTypes = {
  onTransferSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  })
};
