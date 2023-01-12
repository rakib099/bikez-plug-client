import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Bikez Plug`;
    }, [title]);
}

export default useTitle;