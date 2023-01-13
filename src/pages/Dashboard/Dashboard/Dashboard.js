import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>Welcome to Dashbord</h3>
            <div className="bg-rose-100 p-5 lg:w-2/3 mx-auto mb-6 rounded-lg">
                <p className='text-xl text-center'>Here different type of user will see different routes. Basically, the routes will appear based on the user that is currently logged in. User can easily navigate through the routes using the left sidebar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-gray-100 p-5 border-[teal] border-2 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">Sellers will see (these routes)</h3>
                    <ul className="list-disc ml-5">
                        <li>Add a product</li>
                        <li>My Products</li>
                    </ul>
                </div>
                <div className="bg-gray-100 p-5 border-[teal] border-2 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">Admin will see (these routes)</h3>
                    <ul className="list-disc ml-5">
                        <li>All Sellers</li>
                        <li>All Buyers</li>
                        <li>Reported Items</li>
                    </ul>
                </div>
                <div className="bg-gray-100 p-5 border-[teal] border-2 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">Buyers will see (these routes)</h3>
                    <ul className="list-disc ml-5">
                        <li>My Orders</li>
                        <li>My Wishlist (yet to build)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;