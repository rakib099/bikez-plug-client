import React from 'react';

const BuyersRow = ({buyer, idx, setBuyer}) => {
    return (
        <tr>
            <th>{idx + 1}</th>
            <td><div className="font-semibold">{buyer.name}</div></td>
            <td>{buyer.email}</td>
            <td>
                <label htmlFor='confirm-modal' onClick={() => setBuyer(buyer)} className="btn bg-red-400 border-none hover:bg-red-500 btn-sm">Remove Buyer</label>
            </td>
        </tr>
    );
};

export default BuyersRow;