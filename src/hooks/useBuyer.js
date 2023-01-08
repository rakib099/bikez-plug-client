import { useState } from "react"

const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);

    if (email) {
        fetch(`http://localhost:5000/buyer?email=${email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setIsBuyer(data.isBuyer);
                setIsBuyerLoading(false);
            })
    }
    return [isBuyer, isBuyerLoading];
}

export default useBuyer;