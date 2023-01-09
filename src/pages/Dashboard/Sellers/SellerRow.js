import React from 'react';

const SellerRow = ({ seller, idx }) => {
    return (
        <tr>
            <th>{idx + 1}</th>
            <td><div className="font-semibold">{seller.name}</div></td>
            <td>{seller.email}</td>
            <td>
                <button className="btn bg-red-400 border-none hover:bg-red-500 btn-sm">Remove Seller</button>
            </td>
            <td>
                <button className="btn bg-blue-500 border-none  hover:bg-blue-600 btn-sm">Verify</button>
            </td>
        </tr>
    );
};

export default SellerRow;