import { Button, Col, Form, FormProps, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { Token } from "../../types/Token";
import { decodedToken, logout } from "../../components/utils/auth";
import { Address } from "../../types/Profile";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import MockupComapany from "../../Data/MockupCompany";


export default function StaffProfile() {
    const [user, setUser] = useState<Token | null>(null)
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(MockupComapany.lat && MockupComapany.lng ? { lat: MockupComapany.lat, lng: MockupComapany.lng } : null);
    const [mode, setMode] = useState<number>(0); // 0 = view, 1 = edit

    console.log('markker', markerPosition);

    useEffect(() => {
        const fetchUser = async () => {
            const decoded = await decodedToken();
            setUser(decoded);
        };

        fetchUser();
    }, [])

    const onFinish: FormProps<Address>['onFinish'] = async (values) => {
        console.log('Input Success:', values);
    }

    const onFinishFailed: FormProps<Address>['onFinishFailed'] = (errorInfo) => {
        console.log('Input Failed:', errorInfo);
    }

    // const handleMapClick = (event: google.maps.MapMouseEvent) => {
    //     if (event.latLng) {
    //         setMarkerPosition({
    //             lat: event.latLng.lat(),
    //             lng: event.latLng.lng(),
    //         });
    //     }
    // };

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

                <div className="pt-4">
                    <div className="flex flex-row flex-wrap h-full w-full py-5 px-10 bg-white rounded-md shadow-md">
                        <div className=" basis-2/3">

                            <Form
                                name="address"
                                layout="vertical"
                                style={{ width: '100%', margin: 'auto' }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                scrollToFirstError
                                initialValues={MockupComapany}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item<Address>
                                            label="Building Number/Place Name"
                                            name="building"
                                            rules={[{ required: true, message: 'Please input your building number/Place Name!' }]}
                                        >
                                            <Input
                                                disabled={mode ? false : true}
                                            />
                                        </Form.Item>

                                        <Form.Item<Address>
                                            label="Subdistrict"
                                            name="subdistrict"
                                            rules={[{ required: true, message: 'Please input your subdistrict!' }]}
                                        >
                                            <Input
                                                disabled={mode ? false : true}
                                            />
                                        </Form.Item>

                                        <Form.Item<Address>
                                            label="Country"
                                            name="country"
                                            rules={[{ required: true, message: 'Please input your country!' }]}
                                        >
                                            <Input
                                                disabled={mode ? false : true}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item<Address>
                                            label="Street"
                                            name="street"
                                            rules={[{ required: true, message: 'Please input your street!' }]}
                                        >
                                            <Input
                                                disabled={mode ? false : true}
                                            />
                                        </Form.Item>

                                        <Form.Item<Address>
                                            label="District"
                                            name="district"
                                            rules={[{ required: true, message: 'Please input your district!' }]}
                                        >
                                            <Input
                                                disabled={mode ? false : true}
                                            />
                                        </Form.Item>

                                        <Form.Item<Address>
                                            label="Postcode"
                                            name="postcode"
                                            rules={[{ required: true, message: 'Please input your postcode!' }]}
                                        >
                                            <Input
                                                disabled={mode ? false : true}
                                            />
                                        </Form.Item>

                                        <Form.Item label={null} className=" justify-items-end">
                                            {mode ?
                                                <Button type="primary" onClick={() => setMode(0)}> Save </Button>
                                                :
                                                <Button type="primary" onClick={() => setMode(1)}> Edit </Button>
                                            }
                                            {/* <Button type="primary" htmlType="submit"> Save </Button> */}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className=" basis-1/3 pl-10">
                            <APIProvider apiKey="AIzaSyA2Mpr8UP4qBySvFbKQfIJx__06n0eJWMg">
                                <Map
                                    className="w-full h-full"
                                    defaultCenter={{ lat: 13.6507797, lng: 100.4945592 }}
                                    defaultZoom={15}
                                    gestureHandling={mode ? 'greedy' : 'none'}
                                    disableDefaultUI={true}
                                    onCenterChanged={(center) => { setMarkerPosition(center?.detail.center) }}
                                    
                                >
                                    {markerPosition && (
                                        <Marker position={markerPosition} />
                                    )}
                                </Map>
                            </APIProvider>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}