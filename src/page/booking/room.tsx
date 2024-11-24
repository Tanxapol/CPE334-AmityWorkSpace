import { DownOutlined } from "@ant-design/icons";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import {
    Button,
    Card,
    ConfigProvider,
    Dropdown,
    GetProps,
    Input,
    MenuProps,
    Slider,
    Space,
    DatePicker,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import MockupRoom from "../../Data/MockupRoom";
import { Token } from "../../types/Token";
import { decodedToken } from "../../components/utils/auth";



export default function Room() {
    const [user, setUser] = useState<Token | null>(null)
    const [value, setValue] = useState(30);
    const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
    const [filteredRooms, setFilteredRooms] = useState(MockupRoom);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const decoded = await decodedToken();
            setUser(decoded);
        };

        fetchUser();
    }, [])

    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log("search input from orange one", info?.source, value);
        const filteredroom = MockupRoom.filter((room) => room.title.toLowerCase().includes(value.toLowerCase()));
        console.log("filtered room", filteredroom);
        setFilteredRooms(filteredroom);
        // window.location.href = `room?search=${value}`;
    }

    console.log("this is mockupRoom", MockupRoom);


    const handleSliderChange = (value: number) => {
        console.log("slider value", value);
        setValue(value);
    };

    const itemsCapacity: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <div className="w-[15.625rem]">
                    <Slider
                        min={0}
                        max={20}
                        defaultValue={3}
                        marks={{
                            0: '0',
                            5: '5',
                            10: '10',
                            15: '15',
                            20: '20+',
                        }}
                        onChange={handleSliderChange}
                    />
                </div>
            ),
        },
    ];

    const handleMarkerHover = (index: number) => {
        setHoveredMarker(index);
        if (cardRefs.current[index]) {
            cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };
    const ItemAmenities: MenuProps["items"] = [
        { key: '1', label: 'Bike storage' },
        { key: '2', label: 'Pet-friendly' },
        { key: '3', label: 'Espresso bar' },
        { key: '4', label: 'Event space' },
        { key: '5', label: 'Outdoor space' },
        { key: '6', label: 'Parking' },
        { key: '7', label: 'Showers' },
        { key: '8', label: 'Wellness room' },
    ];

    const itemDropSetting = (): MenuProps['items'] => [
        { key: '1', label: 'Booking', onClick: () => { navigate(`report/`) } },
        { type: 'divider' },
        { key: '2', label: 'Setting', onClick: () => { navigate('setting/') } },
        { key: '3', label: 'Delete', onClick: () => { } },
    ]

    // const menu = (
    //     <Menu>
    //         <Menu.Item key="slider">
    //             <Slider
    //                 min={0}
    //                 max={1000}
    //                 onChange={handleSliderChange}
    //                 value={value}
    //                 railStyle={{ backgroundColor: '#55BDCA', height: 10 }} // Custom rail style
    //                 trackStyle={{ backgroundColor: '#04244A', height: 10 }} // Custom track style
    //                 handleStyle={{ borderColor: '#F07C41', height: 20, width: 20 }} // Custom handle style
    //             />
    //         </Menu.Item>
    //     </Menu>
    // );

    return (
        <>
            <div className="flex flex-col w-full min-h-screen bg-gd">
                {/* bar */}
                <div className="flex flex-none items-center justify-between h-12 w-full fixed z-10 bg-[#fefbf2]">
                    <div className="flex items-center">
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
                                    defaultValue={new URLSearchParams(window.location.search).get('search') || ''}
                                    allowClear
                                    onSearch={onSearch}
                                    enterButton
                                />
                            </ConfigProvider>
                        </div>
                        <div className="flex space-x-4">
                            <Dropdown menu={{ items: itemsCapacity }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>Capacity<DownOutlined /></Space>
                                </a>
                            </Dropdown>
                            <Dropdown overlay={<DatePicker onChange={(e) => console.log("date selected", e)} />}>
                                <a>
                                    <Space>
                                        Move-in
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                            <Dropdown menu={{ items: ItemAmenities }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>Amenities<DownOutlined /></Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="px-3">
                        {user?.role && ['staff', 'admin'].includes(user.role) ? <Button onClick={() => window.location.href = "createroom"} type="primary">CREATE</Button> : null}
                        {/* <Button type="primary">CREATE</Button> */}
                    </div>

                </div>

                <div className="pt-12 flex relative">
                    <div className="flex-1">
                        {filteredRooms.map((card, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`m-4 ${hoveredMarker === index ? 'drop-shadow-lg' : ''}`}
                            >
                                <Card
                                    hoverable
                                    bodyStyle={{ padding: 0 }} // Disable padding in the card body
                                    onClick={() => window.location.href = `booking/${card.id}`}
                                >
                                    <div className="flex flex-row h-full relative">
                                        <div className="p-1"><img src={card.imageURL} alt="" className="w-96 h-full object-cover aspect-4/3 rounded" /></div>
                                        <div className="flex flex-col w-full m-4">
                                            <p className="HEAD-3XL-30">{card.title}</p>
                                            <p className="CONTENT-LG-16 h-max">{card.country}</p>
                                            <div className="flex flex-row flex-wrap"><p className="pr-1">|</p>
                                                {card.amenities.map((item, index) => (
                                                    <div className="pr-1" key={index}><p>{item} |</p></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 right-0">
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
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 h-svh sticky top-28">

                        <APIProvider apiKey="AIzaSyA2Mpr8UP4qBySvFbKQfIJx__06n0eJWMg">
                            <Map
                                className="w-full h-full"
                                defaultCenter={{ lat: 13.6507797, lng: 100.4945592 }}
                                defaultZoom={15}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                            />
                            {filteredRooms.map((card, index) => (
                                <Marker
                                    key={index}
                                    position={{ lat: card.lat, lng: card.lng }}
                                    
                                    onMouseOver={() => { handleMarkerHover(index) }}
                                    onMouseOut={() => setHoveredMarker(null)}
                                />
                            ))}
                        </APIProvider>

                    </div>
                </div >
            </div >
        </>
    )
}