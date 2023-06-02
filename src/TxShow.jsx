import { useEffect, useState } from "react";


export const TxShow = ({txHash, alchemy, handleRoute}) => {
    const [txDetail, setTxDetail] = useState();
    useEffect(() => {
        async function getTransaction() {
            const receipt = await alchemy.core.getTransactionReceipt(txHash);
            setTxDetail(receipt);
        }
        getTransaction();
    }, [txHash, alchemy]);
    if(!txDetail) {
        return <div>Loading...</div>;
    }
            

    return (
        <>
            <div>Transaction Hash: {txHash}</div>
            <div>Block Hash: {txDetail.blockHash}</div>
            <div>Block Number: {txDetail.blockNumber}</div>
            <div>From: {txDetail.from}</div>
            <div>To: {txDetail.to}</div>
            <div>Gas Used: {txDetail.gasUsed.toString()}</div>
            <div>Transaction Index: {txDetail.transactionIndex}</div>
            <h4 onClick={()=> handleRoute("home")}>Back to Home</h4>
        </>
    );
};