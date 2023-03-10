import { useState } from "react"

const useVerification = email => {
    const [isSellerVerified, setIsSellerVerified] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(true);

    if (email) {
        fetch(`https://bikez-plug-server.vercel.app/verify?email=${email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setIsSellerVerified(data.isSellerVerified);
            setVerifyLoading(false);
        })
        .catch(err => console.error(err));
    }
    return [isSellerVerified, verifyLoading];
}

export default useVerification;