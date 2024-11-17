import { useLocation } from "react-router-dom";
import { startTransition, useEffect } from "react";

const Checklogin = (children: any) => {
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        startTransition(() => {
            if (!token) window.location.href = '/login';

            
        })
    }, [location])

    return children.elements
};

export default Checklogin;