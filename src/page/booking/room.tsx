import { DownOutlined } from "@ant-design/icons";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Button, Card, ConfigProvider, Dropdown, GetProps, Input, Menu, MenuProps, Slider, Space } from "antd";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";

const center = { lat: 13.6507797, lng: 100.4945592 };

const markers = [
    { lat: 13.6507797, lng: 100.4945592 },
    { lat: 13.650851812361767, lng: 100.49250059094778 },
    { lat: 13.650070505803981, lng: 100.49813038670837 },
]

const cardData = [
    {
        key: '1',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
    {
        key: '2',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
    {
        key: '3',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
    {
        key: '4',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
    {
        key: '4',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
    {
        key: '4',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
    {
        key: '4',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
    {
        key: '4',
        title: "The parq",
        location: "Bang kok",
        image: "/image_72.png",
        amenities: ["Amenity 1", "Amenity 2", "Amenity 3"]
    },
];


export default function Room() {
    const [value, setValue] = useState(30);

    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const itemsCapacity: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className=" flex w-20">
                    <Slider marks={{ 0: '0', 5: '5', 10: '10', 20: '20' }} defaultValue={0} />
                </div>
            )
        },
    ]

    const itemDropSetting: MenuProps['items'] = [
        { key: '1', label: 'Booking' },
        { type: 'divider' },
        { key: '2', label: 'Setting' },
        { key: '3', label: 'Delete' },
    ]

    const handleSliderChange = (newValue: number) => {
        setValue(newValue);
    };

    const menu = (
        <Menu>
            <Menu.Item key="slider">
                <Slider
                    min={0}
                    max={100}
                    onChange={handleSliderChange}
                    value={value}
                    railStyle={{ backgroundColor: '#55BDCA', height: 10 }} // Custom rail style
                    trackStyle={{ backgroundColor: '#04244A', height: 10 }} // Custom track style
                    handleStyle={{ borderColor: '#F07C41', height: 20, width: 20 }} // Custom handle style
                />
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="flex flex-col w-full min-h-screen bg-gd">
                {/* bar */}
                <div className="flex flex-none items-center h-12 w-full fixed z-10 bg-[#fefbf2]">
                    <div className="flex w-96">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgBase: '#F07C41',
                                    // colorPrimary: '#F07C41',
                                    // colorBgContainer: '#F07C41',
                                    // colorText: "#04244A",
                                    // colorTextPlaceholder: 'rgba(4, 36, 74, 0.50)',
                                    // colorIcon: "#ffffff",
                                    // colorBorder: "#F07C41",
                                },
                                components: {
                                    Button: {
                                        colorPrimary: "#F07C41",
                                    },
                                    Input: {
                                        // colorBgBase: '#F07C41',
                                        colorText: "#04244A",
                                        colorTextPlaceholder: "rgba(4, 36, 74, 0.50)",
                                        colorBorder: "#F07C41",
                                        activeBorderColor: "#F07C41",

                                    }
                                }
                            }}
                        >
                            <Search
                                className="px-3"
                                type="primary"
                                placeholder="Search"
                                allowClear
                                onSearch={onSearch}
                                enterButton
                            />
                        </ConfigProvider>
                    </div>
                    <div>
                        <Dropdown menu={{ items: itemsCapacity }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>Capacity<DownOutlined /></Space>
                            </a>
                        </Dropdown>

                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="primary">Open Slider</Button>
                        </Dropdown>
                    </div>

                </div>

                <div className="pt-12 flex relative">
                    <div className="flex-1">
                        {cardData.map((card, index) => (
                            <Card
                                key={index}
                                className="m-4"
                                hoverable
                                bodyStyle={{ padding: 0 }} // Disable padding in the card body
                                onClick={() => window.location.href = `booking/${card.key}`}
                            >
                                <div className="flex flex-row h-full relative">
                                    <div className="p-1"><img src={card.image} alt="" className="w-full h-full object-cover aspect-4/3 rounded" /></div>
                                    <div className="flex flex-col w-full m-4">
                                        <p className="HEAD-3XL-30">{card.title}</p>
                                        <p className="CONTENT-LG-16 h-max">{card.location}</p>
                                        <div className="flex flex-row flex-wrap"><p className="pr-1">|</p>
                                            {card.amenities.map((item, index) => (
                                                <div className="pr-1" key={index}><p>{item} |</p></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0">
                                        <Dropdown menu={{ items: itemDropSetting }}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space><Button type="primary"><CiSettings />Setting</Button></Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex-1 h-svh sticky top-28">

                        <APIProvider apiKey="AIzaSyA2Mpr8UP4qBySvFbKQfIJx__06n0eJWMg">
                            <Map
                                className="w-full h-full"
                                defaultCenter={center}
                                defaultZoom={15}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                            />

                            {markers.map((marker, index) => (
                                <Marker key={index} position={marker} />
                            ))}
                        </APIProvider>

                    </div>
                </div >
            </div >
        </>
    )
}