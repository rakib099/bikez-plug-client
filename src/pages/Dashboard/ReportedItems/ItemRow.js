import React from 'react';

const ItemRow = ({ item, setReportedItem }) => {
    const { img, name, resalePrice, category } = item;

    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
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
        </tr>
    );
};

export default ItemRow;