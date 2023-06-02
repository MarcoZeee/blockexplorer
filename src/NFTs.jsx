import { useState } from "react";


export const NFTs = ({ alchemy }) => {
    const [account, setAccount] = useState();
    const [nfts, setNFTs] = useState();
    const totalNFTs = nfts? nfts.length: 0;
    if(account && !nfts) {
        return <div>Loading NFTs...</div>;
    }
    return (
        <>
            <h4>NFTs</h4>
            {account && <div>Account: {account}</div>}
            {<form onSubmit={async (e) => {
                e.preventDefault();
                const { account } = e.target.elements;
                setAccount(account.value);
                const {ownedNfts} = await alchemy.nft.getNftsForOwner(account.value);
                setNFTs(ownedNfts);
            }}>
                <label htmlFor="account">Account:</label>
                <input id="account" name="account" type="text" />
                <button type="submit">Submit</button>
            </form>}
            {nfts && <div>Total NFTs: {totalNFTs}</div>}
        </>
    );
};