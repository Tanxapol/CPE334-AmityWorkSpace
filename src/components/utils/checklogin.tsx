import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Checklogin = (children: any) => {
    const location = useLocation();

    useEffect(() => {
        // Add your side effect logic here if needed
    }, [location])

    return children.elements
};

export default Checklogin;