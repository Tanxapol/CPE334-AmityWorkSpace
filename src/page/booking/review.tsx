import { useNavigate, useParams } from "react-router-dom"
import { Rooms } from "../../types/Room"
import MockupRoom from "../../Data/MockupRoom"
import { useEffect, useState } from "react"
import { Avatar, Button, DatePicker, Divider, Form, FormProps, List, TimePicker, Modal, Input, Rate, Dropdown, MenuProps } from "antd"
import { BookingForm } from "../../types/ฺBooking"
import { StarFilled } from "@ant-design/icons"
import { FaCheckCircle, FaDiceSix, FaHamburger, FaUserFriends } from "react-icons/fa"
import { BsBarChartFill, BsGeoAltFill } from "react-icons/bs"
import { CgGym, CgScreen } from "react-icons/cg"
import { BiSolidExit } from "react-icons/bi"
import { ReviewData } from "../../types/Review"
import { Token } from "../../types/Token"
import { decodedToken } from "../../components/utils/auth"
import { CiSettings } from "react-icons/ci"

const amenities = [
    {
        icon: <BsGeoAltFill />,
        detail: "Parking"
    },
    {
        icon: <BiSolidExit />,
        detail: "Event space"
    },
    {
        icon: <CgGym />,
        detail: "Event space"
    },
    {
        icon: <FaHamburger />,
        detail: "Food court"
    },
    {
        icon: <FaDiceSix />,
        detail: "Food court"
    },
]

const data = [
    {
        title: 'Ant Design Title 1',
        rate: 3
    },
    {
        title: 'Ant Design Title 2',
        rate: 4
    },
    {
        title: 'Ant Design Title 3',
        rate: 5
    },
    {
        title: 'Ant Design Title 4',
        rate: 2.5
    },
];

export default function Review() {
    const { room_id } = useParams<{ room_id: string }>()
    const [roomdetail, setRoomdetail] = useState<Rooms | null>(null)
    const [user, setUser] = useState<Token | null>(null)
    const navigate = useNavigate();

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

        const fetchUser = async () => {
            const decoded = await decodedToken();
            setUser(decoded);
        };

        fetchUser();

    }, [room_id])

    const onFinish: FormProps<BookingForm>['onFinish'] = async (values) => {
        console.log('Input Success:', values);
    }

    const onFinishFailed: FormProps<BookingForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Input Failed:', errorInfo);
    }

    const itemDropSetting = (): MenuProps['items'] => [
        { key: '1', label: 'Delete', onClick: () => { } },
    ]

    return (
        <>
            <div className="flex flex-col flex-wrap p-10 min-h-dvh w-full">
                <div>
                    <p className="HEAD-5XL-48">{roomdetail?.title}</p>
                    <p className="text-2xl font-bold">{roomdetail?.country}</p>
                    <p className="CONTENT-LG-16">{roomdetail?.building}, {roomdetail?.street}, {roomdetail?.subdistrict}, {roomdetail?.district}, {roomdetail?.country}, {roomdetail?.postcode}</p>
                </div>

                <div className="basis-1/2 pr-10 py-4">
                    <img
                        src={`${roomdetail?.imageURL}`}
                        alt="Room"
                        className=" h-96 w-full object-cover aspect-video rounded-xl mr-4"
                    />
                </div>

                <div className="flex flex-col basis-1/2">
                    <div className="flex justify-end">
                        <div><p className="CONTENT-LG-16 mr-10"><StarFilled style={{ color: '#FADB14' }} /> {roomdetail?.star}  |  7 Reviews</p></div>

                    </div>
                    <div className="flex flex-row">
                        <div className=" basis-1/2">
                            <p className="CONTENT-XL-20">Office Details</p>
                            <div className="flex flex-row w-full p-2">
                                <div className="px-4 content-center"><FaUserFriends /></div>
                                <div><p>1-person capacity <br />Your exact desk will be assigned at move-in</p></div>
                            </div>

                            <div className="flex flex-row w-full p-2">
                                <div className="px-4 content-center"><BsBarChartFill /></div>
                                <div><p>Floor 8</p></div>
                            </div>

                            <div className="flex flex-row w-full p-2">
                                <div className="px-4 content-center"><CgScreen /></div>
                                <div><p>Fully-furnished</p></div>
                            </div>

                        </div>
                        <div className=" basis-1/2">
                            <p className="CONTENT-XL-20">Amenities</p>
                            {amenities.map((item, index) => (
                                <div key={index} className="flex flex-row w-full p-2">
                                    <div className="px-4 content-center">{item.icon}</div>
                                    <div><p>{item.detail}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review */}
                <div className="pt-10 flex flex-col h-[40rem]">
                    <p className="HEAD-3XL-30">Review</p>
                    <Divider />
                    {user?.role === 'user' ?
                        <Form
                            name="review"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            scrollToFirstError
                        >
                            <Form.Item
                                label=""
                                name="rating"
                                rules={[{ required: true, message: 'Please input your rating!' }]}
                            >
                                <Rate
                                    allowHalf
                                    allowClear
                                />
                            </Form.Item>

                            <Form.Item<ReviewData>
                                label=""
                                name="comment"
                                rules={[{ required: true, message: 'Please input your review!' }]}
                            >
                                <Input.TextArea placeholder="Write your review here" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">Add Comment</Button>
                            </Form.Item>
                        </Form>
                        : null
                    }
                    <List

                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item
                                className="h-full"
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={
                                        <div className="flex justify-between">
                                            <div className="">
                                                <span className="pr-4">{item.title}</span>
                                                <Rate disabled defaultValue={item.rate} />
                                            </div>
                                            <div className="">
                                                {user?.role && ['staff', 'admin'].includes(user.role) ?
                                                    <Dropdown menu={{ items: itemDropSetting() }}>
                                                        <Button type="primary"><CiSettings />Setting</Button>
                                                        {/* <Space></Space> */}
                                                        {/* <a onClick={(e) => e.preventDefault()}>
                                                    </a> */}
                                                    </Dropdown>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    }
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </div>

            </div>
        </>
    )
}