import { useState } from "react"

const useToken = email => {
    const [token, setToken] = useState('');

    if (email) {
        fetch(`http://localhost:5000/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                setToken(data.accessToken);
            }
        })
        .catch(err => console.error(err));
    }
    return [token];
}

export default useToken;