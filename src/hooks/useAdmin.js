import { useEffect, useState } from "react";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    
    useEffect(() => {
        if (email) {
            fetch(`https://bikez-plug-server.vercel.app/admin?email=${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);
                })
                .catch(err => console.error(err));
        }
    }, [email]);
    return [isAdmin, isAdminLoading];
}

export default useAdmin;