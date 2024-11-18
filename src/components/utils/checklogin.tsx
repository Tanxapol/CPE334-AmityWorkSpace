import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { startTransition } from "react";

interface Props {
    elements: JSX.Element;
    islogin: string;
}

const Checklogin = (children: Props) => {
    if (children.islogin === 'no') return children.elements; // Render the wrapped components if the user is not authenticated
    
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token'); //Retrieve the token from local storage

        startTransition(() => {
            // If no token is found, redirect to the root URL
            if (!token) window.location.href = '/login';
        });


        return
    }, [location]); // Run this effect whenever the location changes

    return children.elements; // Render the wrapped components if the user is authenticated
};

export default Checklogin;