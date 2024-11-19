import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { decodedToken } from "./auth";

interface Props {
    elements: JSX.Element;
    islogin: string;
}

const Checklogin = (children: Props) => {
    // if (children.islogin === 'no') {
    //     const user = decode
    // } else
    //     return children.elements; // Render the wrapped components if the user is not authenticated

    const location = useLocation();

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage

            const user = await decodedToken(); // Decode the token

            if (token) {
                if (children.islogin === 'no') {
                    if (user?.role === 'user') {
                        window.location.href = '/user';
                    } else if (user?.role === 'staff') {
                        window.location.href = '/staff';
                    } else if (user?.role === 'admin') {
                        window.location.href = '/admin';
                    }
                }

            }
            if (children.islogin === 'user' && user?.role !== 'user') {
                window.location.href = '/';
            } else if (children.islogin === 'staff' && user?.role !== 'staff') {
                window.location.href = '/';
            } else if (children.islogin === 'admin' && user?.role !== 'admin') {
                window.location.href = '/';
            }


        };

        checkUser(); // Call the checkUser function when the component is mounted

        return
    }, [location]); // Run this effect whenever the location changes

    return children.elements; // Render the wrapped components if the user is authenticated
};

export default Checklogin;