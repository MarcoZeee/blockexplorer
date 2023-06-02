
import { useState } from "react";


export const Account = ({ alchemy }) => {
    const [balance, setBalance] = useState();
    const [account, setAccount] = useState();
    if(account && !balance) {
        return <div>Loading balance...</div>;
    }
    return (
        <>
            <h4>Account</h4>
            {account && <div>Account: {account}</div>}
            {<form onSubmit={async (e) => {
                e.preventDefault();
                const { account } = e.target.elements;
                setAccount(account.value);
                const result = await alchemy.core.getBalance(account.value);
                setBalance(result);
            }}>
                <label htmlFor="account">Account:</label>
                <input id="account" name="account" type="text" />
                <button type="submit">Submit</button>
            </form>}
            {balance && <div>Balance: {balance.toString()} ETH</div>}
        </>
    );
};