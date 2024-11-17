import { DownOutlined } from "@ant-design/icons";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Button, Card, ConfigProvider, Dropdown, GetProps, Input, Menu, MenuProps, Slider, Space } from "antd";
import { useState } from "react";

const center = { lat: 13.6507797, lng: 100.4945592 };

const markers = [
    { lat: 13.6507797, lng: 100.4945592 },
    { lat: 13.650851812361767, lng: 100.49250059094778 },
]

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
            <div className="flex flex-col w-full h-12 min-h-svh bg-gd">
                <div className="flex flex-none items-center h-12 w-full bg-[#fefbf2] z-50">
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

                <div className="flex flex-row w-full h-full">

                    <div className="basis-1/2">
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </div>

                    <div className="basis-1/2">
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
                </div>
            </div>
        </>
    )
}