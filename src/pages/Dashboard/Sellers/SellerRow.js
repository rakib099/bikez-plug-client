import React from 'react';
import { toast } from 'react-hot-toast';

const SellerRow = ({ seller, idx, refetch }) => {

    const handleVerify = () => {
        fetch(`http://localhost:5000/sellers/${seller._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    toast.success('Seller Successfully Verified!');
                    refetch();
                }
            })
            .catch(err => console.error(err));
    }
    return (
        <tr>
            <th>{idx + 1}</th>
            <td><div className="font-semibold">{seller.name}</div></td>
            <td>{seller.email}</td>
            <td>
                <button className="btn bg-red-400 border-none hover:bg-red-500 btn-sm">Remove Seller</button>
            </td>
            <td>
                {
                    seller.verified ?
                        <span className="text-primary font-medium ml-1">Verified</span>
                        :
                        <button onClick={handleVerify} className="btn bg-blue-500 border-none  hover:bg-blue-600 btn-sm">Verify</button>
                }
            </td>
        </tr>
    );
};

export default SellerRow;