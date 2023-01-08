import React from 'react';

const OrderRow = ({ order }) => {
    const { img, bike, price, bookedOn } = order;

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
                <div className="font-bold">{bike}</div>
                <div className="text-sm opacity-75">${price}</div>
            </td>
            <td>{bookedOn}</td>
            <th>
                {
                    order.paid ?
                    <div className="text-primary">Paid</div>
                    :
                    <button className="btn btn-primary btn-sm">Pay</button>
                }
            </th>
        </tr>
    );
};

export default OrderRow;