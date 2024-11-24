import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Rooms } from "../../types/Room"
import MockupRoom from "../../Data/MockupRoom"
import { Button, Table, TableColumnsType } from "antd"
import { ReportbookingData } from "../../types/Reportbooking"
import MockupReportRoom from "../../Data/MockupReprotRoom"

export default function Reportbooking() {
    const { room_id } = useParams<{ room_id: string }>()
    const [roomdetail, setRoomdetail] = useState<Rooms | null>(null)

    useEffect(() => {
        try {
            const room_detail = MockupRoom.find((room) => room.id === Number(room_id))
            if (room_detail) {
                console.log("Room detail:", room_detail);

                setRoomdetail(room_detail)
            } else {
                setRoomdetail(null)
            }
        } catch (error) {
            console.error("Error fetching room detail:", error)
        }
    }, [room_id])

    const colhis: TableColumnsType<ReportbookingData> = [
        {
            title: "NUMBER",
            dataIndex: "number",
            key: "number",
            align: "center",
            width: "1%",
            render: (_value, _item, index) => index + 1,
        },
        {
            title: "NAME",
            dataIndex: "name",
            key: "name",
            align: "center",
            render: (_value, item) => `${item.firtname} ${item.lastname}`,
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
            render: (_value, item) => `${item.timestart} - ${item.timeend}`,
        },
        {
            title: "PHONE NUMBER",
            dataIndex: "phone_number",
            key: "phone_number",
            align: "center",
        },
        {
            title: "",
            key: "action",
            render: () => (
                <Button type="primary">REVIEW</Button>
            ),
            width: "1%",
        }
    ]

    return (
        <>
            <div className="flex flex-col flex-wrap p-10 min-h-dvh w-full">
                <div>
                    <p className="HEAD-5XL-48">{roomdetail?.title}</p>
                    <p className="text-2xl font-bold">{roomdetail?.country}</p>
                    <p className="CONTENT-LG-16">{roomdetail?.building}, {roomdetail?.street}, {roomdetail?.subdistrict}, {roomdetail?.district}, {roomdetail?.country}, {roomdetail?.postcode}</p>
                </div>

                <div className="pt-4">
                    <Table
                    dataSource={MockupReportRoom.filter((item) => item.room_id === Number(room_id))}
                    columns={colhis}
                    />
                </div>
            </div>
        </>
    )
}