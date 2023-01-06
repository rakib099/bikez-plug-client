import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Emmy's Consultancy`;
    }, [title]);
}

export default useTitle;