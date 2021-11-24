import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import TransferForm from './components/TransferForm';
import MintForm from './components/MintForm';
import SignIn from './components/SignIn';
import Notification from './components/Notification';
import spaceman from './assets/beard-white.svg';
import beardLogo from './assets/beard-white.svg';

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [balance, setBalance] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    getBalance()
  }, [])

  const getBalance = () => {
    currentUser ? contract.ft_balance_of({account_id: currentUser.accountId }).then(balance => {setBalance(balance*1000000000000000000000000)}) : 0
  }

  const register = () => {
    contract.storage_deposit(
      {
        account_id: currentUser.accountId,
      },
      BOATLOAD_OF_GAS,
      Big(1)
        .times(10 ** 24)
        .toFixed()
    );
  };

  // const registerReceiver = () => {
  //   contract.storage_deposit(
  //     {
  //       account_id: receiver.value,
  //     },
  //     BOATLOAD_OF_GAS,
  //     Big(1)
  //       .times(10 ** 24)
  //       .toFixed()
  //   );
  // };

  const onMintSubmit = (e) => {
    e.preventDefault();
    const { fieldset, amount } = e.target.elements;
    contract.ft_mint(
      {
        receiver_id: currentUser.accountId,
        amount: amount.value,
      },
      BOATLOAD_OF_GAS,
      Big(1).times(10 ** 24).toFixed()
    ).then(() => {
      getBalance()
      amount.value = 0;
      fieldset.disabled = false;
      accountId.focus();
      // show Notification
      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false)
      }, 11000)
    })
  }

  const onTransferSubmit = (e) => {
    e.preventDefault();
    const { fieldset, receiverId, amount } = e.target.elements;
    fieldset.disabled = true;
    contract.ft_transfer(
      {
        receiver_id: receiverId.value,
        amount: amount.value
      },
      BOATLOAD_OF_GAS,
      Big(0.000000000000000000000001).times(10 ** 24).toFixed()
    ).then(() => {
      getBalance()
      accountId.value = '';
      amount.value = 0;
      fieldset.disabled = false;
      accountId.focus();
      // show Notification
      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false)
      }, 11000)
    })
  }

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEARvember challenge 6'
    )
  }

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname)
  }

  return (
    <main>
      {currentUser ?
      <div>
        <header>

          <button className="signout" onClick={signOut}>Log out</button>
        </header>
        <div>
          <h1 style={{ textAlign: 'center' }}>NEARvember Challenge #6</h1>

          <h3>Using this DApp you can mint HOPE Token and send it to your friends!</h3>
           <div className="account">
            <div>Hi <span>{currentUser.accountId}!</span> Your balance: <span>{balance/1000000000000000000000000} HOPE,</span> <span>{(currentUser.balance/1000000000000000000000000).toFixed(4)} NEAR</span></div>
          </div>  
        </div>
      </div>
      :
      <header><button className="signin" onClick={signIn}>Log in</button></header>
      }
      { currentUser
        ? <div>
            <div>
              <p>To get some HOPE you need:</p>
              <p>
                Step 1 - Open Deposit storage for HOPE token, if you havent used it BRD before{' '}
                <button className="register" onClick={register}>Register</button>
              </p>
              <p>Step 2 - Mint and send HOPE to friends</p>
              {/* <p>
                2. Register the receiver to ensure they can recieve transferred tokens
              </p>
                <form onSubmit={registerReceiver}>
                  <fieldset id="fieldset">
                    <span className="highlight">
                      <label htmlFor="receiver">Receiver account:</label>
                      <input
                        autoComplete="off"
                        autoFocus
                        id="receiver"
                        required
                      />
                      <button type="submit">Register</button>
                    </span>
                  </fieldset>
                </form> */}
            </div>
            <div className="message-area">
            <div style={{ flex: 1 }}>
              <MintForm onMintSubmit={onMintSubmit} currentUser={currentUser} />
            </div>
            <div style={{ flex: 1 }}>
              <TransferForm onTransferSubmit={onTransferSubmit} currentUser={currentUser} balance={balance} />
            </div>
          </div>
        </div>
        : <SignIn />
      }
      { !!currentUser }
      {showNotification && <Notification currentUser={currentUser} amount={getBalance()} />}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    ft_balance_of: PropTypes.func.isRequired,
    ft_mint: PropTypes.func.isRequired,
    ft_transfer: PropTypes.func.isRequired,
    // is_registered: PropTypes.func.isRequired,
    storage_deposit: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
