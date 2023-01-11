import React from 'react';
import { toast } from 'react-hot-toast';

const ProductRow = ({ product, setBike, refetch }) => {
    const { _id, img, name, resalePrice, status, advertised } = product;

    const handleAdvertise = () => {
        fetch(`https://bikez-plug-server.vercel.app/bikes/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ advertised })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    if (!advertised) {
                        toast.success("Item successfully advertised!")
                    }
                    else {
                        toast.error("Advertisement Revoked!")
                    }
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <tr>
            <th>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask w-20 h-12 rounded">
                            <img src={img} alt="Order" />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{name}</div>
                <div className="text-sm opacity-75">${resalePrice}</div>
            </td>
            <td>
                <div className="">{status === 'unsold' ? 'Available' : status}</div>
            </td>
            <th>
                <label htmlFor='confirm-modal' onClick={() => setBike(product)} className="btn bg-red-400 border-none hover:bg-red-500 btn-sm">Delete Item</label>
            </th>
            <td>
                {
                    !advertised && status === 'unsold' &&
                    <button onClick={handleAdvertise} className="btn bg-blue-500 border-none hover:bg-blue-600 text-white btn-sm">Advertise</button>
                }
                {
                    advertised && status === 'unsold' &&
                    <p onClick={handleAdvertise} className="text-primary font-medium btn btn-ghost btn-sm normal-case" title='Click again to unadvertise'>Advertised</p>
                }
            </td>
        </tr>
    );
};

export default ProductRow;