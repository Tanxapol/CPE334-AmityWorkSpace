import { Button } from "antd";
import { useEffect, useState } from "react";
import { Token } from "../../types/Token";
import { decodedToken, logout } from "../../components/utils/auth";


export default function AdminProfile() {
    const [user, setUser] = useState<Token | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const decoded = await decodedToken();
            setUser(decoded);
        };

        fetchUser();
    }, [])

    return (
        <>
            <div className="flex flex-col flex-wrap p-10 min-h-dvh w-full">

                <div className="flex flex-row h-full w-full py-5 px-10 bg-white rounded-md shadow-md">
                    <div className="pr-10">
                        <img src="/image.png" alt="Profile" className=" h-52 object-cover aspect-square rounded-full" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="HEAD-4XL-36">{user?.firstname} {user?.lastname}</p>
                        <p className="CONTENT-LG-16">{user?.email}</p>
                        <div className="flex pt-4">
                            <Button type="primary" className="mr-4">Edit Profile</Button>
                            <Button type="primary" onClick={() => logout()}>LOGOUT</Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}