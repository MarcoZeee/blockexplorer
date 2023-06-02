import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';
import { TxShow } from './TxShow';
import { Account } from './Account';
import { NFTs } from './NFTs';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState("home");
  const [txHash, setTxHash] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    async function getTransactions() {
      const { transactions } = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );
      setTransactions(transactions);
    }
    getBlockNumber().then(() => getTransactions(blockNumber))
  }, [blockNumber]);

  const handleRoute = (route = "home", hash = "") => {
    setPage(route);
    setTxHash(hash);
  }


  return (<>
          <h4>
          <span onClick={()=> handleRoute("home")}>Home</span> |
          <span onClick={()=> handleRoute("account")}>Account</span> | 
          <span onClick={()=> handleRoute("nfts")}>NFTs</span>
          </h4>
          <div className="App">Block Number: {blockNumber}</div>
          {page === "home"?(<>
          <div>Transactions:</div>
          <ul>
          {transactions.map((transaction) => (
            <li key={transaction.hash} onClick={(e)=> handleRoute("detail", transaction.hash)}>{transaction.hash}</li>
          ))}
            </ul>
          </>  ):page === "account" ?(<Account alchemy={alchemy}/>):page === "nfts"?(<NFTs alchemy={alchemy} />):(<TxShow txHash={txHash} alchemy={alchemy} handleRoute={handleRoute}/>)}
          </>);
}

export default App;
