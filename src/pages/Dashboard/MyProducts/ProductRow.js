import React from 'react';

const ProductRow = ({product, setBike}) => {
    const { img, name, resalePrice, status, advertised } = product;

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
                <div className="">{status === 'unsold' ? 'Available' : status}</div>
            </td>
            <th>
                <label htmlFor='confirm-modal' onClick={() => setBike(product)} className="btn bg-red-400 border-none hover:bg-red-500 btn-sm">Delete Item</label>
            </th>
            <td>
                {
                    !advertised && 
                    <button className="btn bg-blue-500 border-none hover:bg-blue-600 text-white btn-sm">Advertise</button>
                }
            </td>
        </tr>
    );
};

export default ProductRow;