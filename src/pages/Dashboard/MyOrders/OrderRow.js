import React from 'react';
import {Link} from 'react-router-dom';

const OrderRow = ({ order }) => {
    const { _id, img, bike, price, bookedOn, paid } = order;

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
                    paid ?
                    <span className="text-primary font-medium ml-1">Paid</span>
                    :
                    <Link to={`/dashboard/payment/${_id}`}><button className="btn btn-primary btn-sm">Pay</button></Link>
                }
            </th>
        </tr>
    );
};

export default OrderRow;