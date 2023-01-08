import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import getFormattedToday from '../../../utils/getFormattedToday';

const BookingModal = ({ bookingInfo, setBookingInfo }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, resalePrice, img } = bookingInfo;

    const currentDate = getFormattedToday();

    const handleBooking = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            name,
            email,
            bike: bookingInfo.name,
            bikeId: _id,
            img,
            price: resalePrice,
            phone,
            location,
            bookedOn: currentDate
        }

        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingInfo(null);
                    form.reset();
                    toast.success(`${bookingInfo.name} successfully booked!`);
                }
                else {
                    toast.error(data.message);
                }
            })
            .catch(err => console.error(err));

    }

    // Todo: send data to the server
    // once data is saved then close the modal
    // and display success toast


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-outline btn-primary btn-sm btn-circle absolute right-2 top-2">X</label>
                    <h3 className="font-bold text-xl mb-6 text-center">Booking Form</h3>
                    <form onSubmit={handleBooking}>
                        <div key={name}>
                            <input type="text" placeholder="Product Name" defaultValue={name} className="input input-bordered w-full mb-5 " disabled />
                        </div>
                        <div key={_id}>
                            <input type="text" placeholder="Product Price" defaultValue={`$${resalePrice}`} className="input input-bordered w-full mb-5 " disabled />
                        </div>


                        <input type="text" defaultValue={user?.displayName} placeholder="Full Name" name='name' className="input input-bordered w-full mb-5" required disabled />
                        <input type="email" defaultValue={user?.email} placeholder="Email" name='email' className="input input-bordered w-full mb-5" required disabled />
                        <input type="number" placeholder="Phone Number" name='phone' className="input input-bordered w-full mb-5" required />
                        <input type="text" placeholder="Meeting Location" name='location' className="input input-bordered w-full mb-5" />

                        <input type="submit" value="Submit" className='btn btn-primary w-full' />
                    </form>
                </div>
            </div>
        </>

    );
};

export default BookingModal;