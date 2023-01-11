import React from 'react';
import { toast } from 'react-hot-toast';

const ItemRow = ({ item, setReportedItem, refetch }) => {
    const { _id, img, name, resalePrice, category } = item;

    const handleUnreport = () => {
        console.log(_id);
        fetch(`https://bikez-plug-server.vercel.app/unreport/${_id}`, {
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
                    refetch();
                    toast.success("Item  Unreported!");
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
                <div className="font-medium">{category}</div>
            </td>
            <th>
                <label htmlFor='confirm-modal' onClick={() => setReportedItem(item)} className="btn bg-red-400 border-none hover:bg-red-500 btn-sm">Delete Item</label>
            </th>
            <td>
                <button onClick={handleUnreport} className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white">Unreport</button>
            </td>
        </tr>
    );
};

export default ItemRow;