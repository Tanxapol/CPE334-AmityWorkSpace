import { Button, Col, Form, FormProps, Input, InputNumber, Radio, Row, Select, SelectProps, Upload } from "antd"
import { Roomcreate } from "../../types/Createroom";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const roomdetail = {
    title: "",
    country: "Bangkok",
    building: "KMUTT",
    street: "Pracha Uthit Rd",
    subdistrict: "Thung Khru",
    district: "Banmod",
    postcode: "10140"
}

const options: SelectProps<string>['options'] = [
    { label: "Bike storage", value: "Bike storage" },
    { label: "Dog-friendly", value: "Dog-friendly" },
    { label: "Espresso bar", value: "Espresso bar" },
    { label: "Event space", value: "Event space" },
    { label: "Outdoor space", value: "Outdoor space" },
    { label: "Parking", value: "Parking" },
    { label: "Showers", value: "Showers" },
    { label: "Wellness room", value: "Wellness room" },
    { label: "Mother's room", value: "Mother's room" },
    { label: "Cleaning services", value: "Cleaning services" },
    { label: "Tech Services", value: "Tech Services" },
    { label: "Meeting rooms", value: "Meeting rooms" },
    { label: "Onsite staff", value: "Onsite staff" },
    { label: "Unique common areas", value: "Unique common areas" },
    { label: "Phone booths", value: "Phone booths" },
    { label: "Stocked kitchens", value: "Stocked kitchens" },
    { label: "Business-class printers", value: "Business-class printers" },
    { label: "Professional events and programming", value: "Professional events and programming" },
    { label: "Production suite", value: "Production suite" },
    { label: "Food hall", value: "Food hall" },
    { label: "Karaoke room", value: "Karaoke room" },
    { label: "Electric vehicle charging stations", value: "Electric vehicle charging stations" },
    { label: "Screening room", value: "Screening room" },
    { label: "Fitness center", value: "Fitness center" },
    { label: "Recording studio", value: "Recording studio" }
];

export default function Createroom() {
    const [title, setTitle] = useState<string | null>('Create New Co-Working');
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleBeforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            console.error('You can only upload image files!');
        }
        return isImage;
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'done') {
            // Get the URL of the uploaded image
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(info.file.originFileObj);
        }
    };

    const onFinish: FormProps<Roomcreate>['onFinish'] = async (values) => {
        console.log('Input Success:', values);
    }

    const onFinishFailed: FormProps<Roomcreate>['onFinishFailed'] = (errorInfo) => {
        console.log('Input Failed:', errorInfo);
    }

    return (
        <>
            <div className="flex flex-col flex-wrap p-10 min-h-dvh w-full">
                <div>
                    <p className="HEAD-5XL-48">{title}</p>
                    <p className="text-2xl font-bold">{roomdetail?.country}</p>
                    <p className="CONTENT-LG-16">{roomdetail?.building}, {roomdetail?.street}, {roomdetail?.subdistrict}, {roomdetail?.district}, {roomdetail?.country}, {roomdetail?.postcode}</p>
                </div>

                <div className="flex flex-wrap">
                    <div className="basis-1/2 pr-10 py-4">
                        {imageUrl ?
                            <img
                                src={imageUrl}
                                alt="room"
                                className=" h-96 w-full object-cover aspect-video rounded-xl mr-4"
                            />
                            :
                            <div className="h-96 w-full bg-gray-200 rounded-xl mr-4"></div>
                        }
                    </div>
                    <div className="basis-1/2 pt-4">
                        <p className="HEAD-4XL-36">CREATE NEW CO-WORKING</p>
                        <Form
                            name="createroom"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            scrollToFirstError
                        >
                            <Form.Item<Roomcreate>
                                label="Room Name"
                                name="title"
                                rules={[{ required: true, message: 'Please input your room name!' }]}
                            >
                                <Input
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Upload Image"
                                rules={[{ required: true, message: 'Please upload your image!' }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={handleBeforeUpload}
                                    onChange={handleChange}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                {/* {imageUrl && <img src={imageUrl} alt="room" style={{ width: '100%', marginTop: '10px' }} />} */}
                            </Form.Item>

                            <Row gutter={32}>
                                <Col>
                                    <Form.Item<Roomcreate>
                                        label="Preson Capacity"
                                        name="person"
                                        rules={[{ required: true, message: 'Please input your person capacity!' }]}
                                    >
                                        <InputNumber
                                            min={1}
                                            defaultValue={1}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item<Roomcreate>
                                        label="Floor"
                                        name="floor"
                                        rules={[{ required: true, message: 'Please input your floor!' }]}
                                    >
                                        <InputNumber
                                            min={1}
                                            defaultValue={1}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item<Roomcreate>
                                        label="Furniture"
                                        name="isfurniture"
                                        rules={[{ required: true, message: 'Please input your furniture!' }]}
                                    >
                                        <Radio.Group
                                            defaultValue="0"
                                        >
                                            <Radio.Button value="1">Furniture provided</Radio.Button>
                                            <Radio.Button value="0">No furniture provided</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item<Roomcreate>
                                label="Amenities"
                                name="amenities"
                                rules={[{ required: true, message: 'Please input your amenities!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    options={options}
                                />
                            </Form.Item>

                            <Form.Item label={null} className="justify-items-center">
                                <Button type="primary" htmlType="submit"> Create Room </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div >
        </>
    )
}