import { Button, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { Token } from "../../types/Token";
import { decodedToken, logout } from "../../components/utils/auth";
import { BookingHistoryData } from "../../types/Profile";
import MockupBookingDetail from "../../Data/MockupBookingDetail";

export default function UserProfile() {
    const [table, setTable] = useState(0)
    const [user, setUser] = useState<Token | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const decoded = await decodedToken();
            setUser(decoded);
        };

        fetchUser();
    }, [])

    const coldetail: TableColumnsType<BookingHistoryData> = [
        {
            title: "NUMBER",
            dataIndex: "number",
            key: "number",
            align: "center",
            width: "1%",
            render: (_value, _item, index) => index + 1,
        },
        {
            title: "PLACE NAME",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "DATE",
            dataIndex: "date",
            key: "date",
            align: "center",
        },
        {
            title: "TIME",
            dataIndex: "time",
            key: "time",
            align: "center",
            render: (_value: any, item: BookingHistoryData) => `${item.timestart} - ${item.timeend}`,
        },
        {
            title: "",
            key: "action",
            render: (_value, _item) => (
                <div className="flex">
                    {table ? (
                        <Button type="primary" className="ml-4">REVIEW</Button>
                    ) : (
                        <>
                            <Button type="primary">CANCEL</Button>
                            <Button onClick={() => window.location.href=`review/${_item.room_id}`} type="primary" className="ml-4">REVIEW</Button>
                        </>
                    )}
                </div>
            ),
            width: "1%",
        },
    ]

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

                <div className="pt-4 pl-10">
                    <Button onClick={() => setTable(0)} type="primary">BOOKING DETAIL</Button>
                    <Button onClick={() => setTable(1)} type="primary" className="ml-4">HISTORY</Button>
                </div>

                <div className="pt-4">
                    <Table
                        dataSource={table === 0 ? MockupBookingDetail.filter((item) => new Date(item.date) > new Date()) : MockupBookingDetail.filter((item) => new Date(item.date) < new Date())}
                        columns={coldetail}
                    />
                </div>
            </div>
        </>
    )
}