import React, { useState } from 'react';
import ItemRow from './ItemRow';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../components/Spinner/Spinner';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';
import { toast } from 'react-hot-toast';

const ReportedItems = () => {
    const [reportedItem, setReportedItem] = useState(null);

    const { data: reportedItems, isLoading, refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reported', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }

    const handleDeleteItem = ({ _id }) => {
        fetch(`http://localhost:5000/reported/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    setReportedItem(null);
                    refetch();
                    toast.success("Item successfully removed from this website!");
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>Reported Items</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Picture</th>
                            <th>Item & Price</th>
                            <th>Category</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems.map(item => <ItemRow
                                key={item._id}
                                item={item}
                                setReportedItem={setReportedItem}
                            />)
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total</th>
                            <th>{reportedItems.length} items</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
            {
                !!reportedItem &&
                <ConfirmModal
                    title={`Are you sure, you want to delete ${reportedItem.name}?`}
                    modalData={reportedItem}
                    successAction={handleDeleteItem}
                />
            }
        </div>
    );
};

export default ReportedItems;