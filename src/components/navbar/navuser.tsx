import { Button, ConfigProvider, GetProps, Input } from "antd";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;


export default function Navuser() {
    // const [search, setSearch] = useState<string>('')
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => { console.log(info?.source, value); }
    const onClick = (path: string) => {
        console.log(path)
        setIsLogin(true)
    }
    return (
        <>
            <div className="w-full h-16 bg-04244A ">
                <div className="flex justify-between items-center w-full h-full px-4">
                    <div className="flex items-center h-full">
                        <img src="workspaceamity-full.svg" alt="LOGO" className="h-3/5" />
                        <Search
                            className="pl-10 w-96"
                            placeholder="Search"
                            allowClear
                            onSearch={onSearch}
                        />
                        <Link to="/" className="CONTENT-LG-16 font-bold text-white hover:text-F07C41 mx-6">HOME</Link>
                        <Link to="/" className="CONTENT-LG-16 font-bold text-white hover:text-F07C41 mx-6">ROOMS</Link>
                    </div>

                    <div className="flex items-center h-full w-auto">
                        {isLogin ?
                            <>
                                <Link to="/" onClick={() => setIsLogin(false)} className="flex items-center  text-F07C41 hover:text-white mx-6 h-3/5 w-full">
                                    <div>

                                        <p className="flex CONTENT-LG-16 font-bold w-auto mx-2">USER_Name</p>
                                    </div>
                                    <CgProfile className="h-full w-full " />
                                </Link>
                            </>
                            :
                            <>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: '#F07C41',
                                        },
                                        components: {
                                            Button: {
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                textTextColor: '#ffffff',
                                                textTextHoverColor: '#f07c41',
                                                primaryColor: '#04244a',
                                                defaultBg: '#f07c41',
                                            }
                                        }
                                    }}
                                >
                                    <Button type="text" onClick={() => onClick("/")} >LOGIN</Button>
                                    <Button type="primary" onClick={() => onClick("/")} >REGISTER</Button>
                                </ConfigProvider>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}