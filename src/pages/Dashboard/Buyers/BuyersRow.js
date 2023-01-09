import React from 'react';

const BuyersRow = ({buyer, idx}) => {
    return (
        <tr>
            <th>{idx + 1}</th>
            <td><div className="font-semibold">{buyer.name}</div></td>
            <td>{buyer.email}</td>
            <td>
                <button className="btn bg-red-400 border-none hover:bg-red-500 btn-sm">Remove Seller</button>
            </td>
            <td>
                <button className="btn bg-blue-500 border-none  hover:bg-blue-600 btn-sm">Verify</button>
            </td>
        </tr>
    );
};

export default BuyersRow;