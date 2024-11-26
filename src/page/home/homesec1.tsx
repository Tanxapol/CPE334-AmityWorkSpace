import { ConfigProvider, GetProps, Input } from "antd";
import { useState, useEffect } from "react";
import { TokenData } from "../../types/Token";
import { decodedToken } from "../../components/utils/auth";

export default function Homesec1() {
    const [user, setUser] = useState<TokenData | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const decoded = await decodedToken();
            console.log(decoded);
            
            setUser(decoded)
        };

        fetchUser();
    }, []);

    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value)

        if (user?.role === "-1") {
            window.location.href = "login"
        } else {
            window.location.href = `/${user?.role}/room?search=${value}`
        }
    };

    return (
        <div className="flex flex-row flex-wrap items-center min-h-dvh w-full p-10 bg-gradient-to-r from-gradient to-gd">
            {/* left section */}
            <div className=" basis-1/2">
                <div className="justify-self-end flex-0">
                    <img src="/image_75.png" alt="left-top" className="w-80 p-3 object-cover aspect-square" />
                    <hr className=" mx-3 h-1 bg-F07C41 border-F07C41" />
                </div>
                <div className="justify-self-end">
                    <img src="/image_75.png" alt="left-buttom" className="w-44 p-3 object-cover aspect-square" />
                    <hr className="w-full mx-3 h-1 bg-F07C41 border-F07C41" />
                </div>
                <div>
                    <p className="HEAD-5XL-48 px-3">Find a coworking space you’ll love</p>
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
                            size="large"
                            type="primary"
                            placeholder="Search"
                            allowClear
                            onSearch={onSearch}
                            enterButton
                        />
                    </ConfigProvider>
                </div>
            </div>
            {/* right section */}
            <div className="flex flex-row flex-wrap basis-1/2 w-full justify-items-stretch">
                <div className=" basis-1/2 items-center p-3 flex-1">
                    <img src="/image_72.png" alt="right-left" className="h-full w-full object-cover aspect-square" />
                </div>
                <div className=" justify-center flex-col flex-1">
                    <div className="p-3 w-80">
                        <img src="/image_75.png" alt="right-right-top" className="w-full h-full object-cover aspect-square" />
                    </div>
                    <div className="p-3 w-80">
                        <img src="/image_2.png" alt="right-right-buttom" className="w-full h-full object-cover aspect-square" />
                    </div>
                </div>
                <hr className="w-full mx-3 h-1 bg-F07C41 border-F07C41" />
            </div>
        </div>
    )
}