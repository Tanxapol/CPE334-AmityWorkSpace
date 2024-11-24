import { useParams } from "react-router-dom"
import { Rooms } from "../../types/Room"
import MockupRoom from "../../Data/MockupRoom"
import { useEffect, useState } from "react"
import { Avatar, Button, DatePicker, Divider, Form, FormProps, List, TimePicker, Modal } from "antd"
import { BookingForm } from "../../types/ฺBooking"
import { StarFilled } from "@ant-design/icons"
import { FaCheckCircle, FaDiceSix, FaHamburger, FaUserFriends } from "react-icons/fa"
import { BsBarChartFill, BsGeoAltFill } from "react-icons/bs"
import { CgGym, CgScreen } from "react-icons/cg"
import { BiSolidExit } from "react-icons/bi"

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
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];


export default function Booking() {
    const { room_id } = useParams<{ room_id: string }>()
    const [roomdetail, setRoomdetail] = useState<Rooms | null>(null)
    const [isBooking, setIsBooking] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);

        // Set a timeout to automatically close the modal after 5 seconds
        setTimeout(() => {
            setIsModalVisible(false);
        }, 2000); // 5000 milliseconds = 5 seconds
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    useEffect(() => {
        try {
            const room_detail = MockupRoom.find((room) => room.id === Number(room_id))
            if (room_detail) {
                console.log("Room detail:", room_detail);

                setRoomdetail(room_detail)
                setIsBooking(room_detail.isbooked)
            } else {
                setRoomdetail(null)
            }
        } catch (error) {
            console.error("Error fetching room detail:", error)
        }
    }, [room_id])

    const onFinish: FormProps<BookingForm>['onFinish'] = async (values) => {
        console.log('Input Success:', values);
        showModal();
    }

    const onFinishFailed: FormProps<BookingForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Input Failed:', errorInfo);
    }

    return (
        <>
            <div className="flex flex-col flex-wrap p-10 min-h-dvh w-full">
                <div>
                    <p className="HEAD-5XL-48">{roomdetail?.title}</p>
                    <p className="text-2xl font-bold">{roomdetail?.country}</p>
                    <p className="CONTENT-LG-16">{roomdetail?.building}, {roomdetail?.street}, {roomdetail?.subdistrict}, {roomdetail?.district}, {roomdetail?.country}, {roomdetail?.postcode}</p>
                </div>

                <div className="flex flex-wrap ">
                    <div className="basis-1/2 pr-10 py-4">
                        <img
                            src={`${roomdetail?.imageURL}`}
                            alt="Room"
                            className=" h-96 w-full object-cover aspect-video rounded-xl mr-4"
                        />
                    </div>
                    <div className="basis-1/2 pt-4">
                        <p className="HEAD-4XL-36">BOOKING</p>
                        <Form
                            name="booking"
                            layout="vertical"
                            style={{ width: '100%', margin: 'auto' }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            scrollToFirstError
                        >

                            <Form.Item<BookingForm>
                                label="Date"
                                name="date"
                                rules={[{ required: true, message: 'Please input your date!' }]}
                            >
                                <DatePicker
                                    className="w-full"
                                />
                            </Form.Item>

                            <Form.Item<BookingForm>
                                label="Time Start"
                                name="timestart"
                                rules={[{ required: true, message: 'Please input your time!' }]}
                            >
                                <TimePicker
                                    className="w-full"
                                    format='HH:mm'
                                    minuteStep={15}
                                />
                            </Form.Item>

                            <Form.Item<BookingForm>
                                label="Time End"
                                name="timeend"
                                rules={[{ required: true, message: 'Please input your time!' }]}
                            >
                                <TimePicker
                                    className="w-full"
                                    format='HH:mm'
                                    minuteStep={15}
                                // onChange={(value) => console.log("Time end:", value)}
                                />
                            </Form.Item>

                            <Form.Item label={null} className=" justify-items-center">
                                <Button type="primary" htmlType="submit">BOOKING</Button>
                            </Form.Item>
                        </Form>
                        <Modal
                            // title="This is a notification message"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            okText="Confirm"
                            cancelText="Cancel"
                            centered
                            closable={false}
                            footer={null}

                        >
                            <div className="flex flex-col items-center bg-04244A">
                                <FaCheckCircle style={{ color: '#FFF', fontSize: '50px' }} />
                                <p className="HEAD-4XL-36 text-white">BOOKING SUCCESS </p>
                                <p className="CONTENT-LG-16 text-center text-white">Thank you for your booking! <br /> Your reservation has been successfully completed</p>
                            </div>
                        </Modal>
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
                </div>

                {/* Review */}
                {isBooking ? (
                    <div className="pt-10 flex flex-col h-[30rem]">
                        <p className="HEAD-3XL-30">Review</p>
                        <Divider />
                        <List

                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item
                                    className="h-full"
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                ) : null}
            </div>
        </>
    )
}