import { Button, ConfigProvider, GetProps, Input } from "antd";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { decodedToken } from "../utils/auth";
import { TokenData } from "../../types/Token";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

type props = {
    navList: {
        name: string;
        path: string;
    }[];
};


export default function Navbar({ navList }: props) {
    const [user, setUser] = useState<TokenData | null>(null)
    const [isLogin, setIsLogin] = useState<boolean>(false)

    useEffect(() => {
        const fetchUser = async () => {
            const decoded = await decodedToken();
            setUser(decoded);

            if (decoded?.role === '-1') {
                setIsLogin(false)
            } else {
                setIsLogin(true)
            }
        };

        fetchUser();
    }, []);

    // const [search, setSearch] = useState<string>('')
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => { 
        console.log(info?.source, value);
        window.location.href = `/${user?.role}/room?search=${value}`
        
    }

    // const handleProfile = () => {
    //     // window.location.href = '/user/profile'
    //     <Navigate to="/user/profile" />
    // }

    return (
        <div className="w-full h-16 sticky top-0 z-50 bg-04244A ">
            <div className="flex justify-between items-center w-full h-full px-4">
                <div className="flex items-center h-full">
                    <img src="/workspaceamity-full.svg" alt="LOGO" className="h-3/5" />
                    <Search
                        className="pl-10 w-96"
                        placeholder="Search"
                        allowClear
                        defaultValue={new URLSearchParams(window.location.search).get('search') || ''}
                        onSearch={onSearch}
                        onClear={() => window}
                    />
                    {navList.map((item, index) => (
                        <Link key={index} to={item.path} className="CONTENT-LG-16 font-bold text-white hover:text-F07C41 mx-6">{item.name}</Link>
                    ))}
                    {/* <Link to="/" className="CONTENT-LG-16 font-bold text-white hover:text-F07C41 mx-6">HOME</Link>
                        <Link to="/" className="CONTENT-LG-16 font-bold text-white hover:text-F07C41 mx-6">ROOMS</Link> */}
                </div>

                <div className="flex items-center h-full w-auto">
                    {isLogin ?
                        <>
                            <Link to="profile" className="flex items-center  text-F07C41 hover:text-white mx-6 h-3/5 w-full">
                                <div>

                                    <p className="flex CONTENT-LG-16 font-bold w-auto mx-2">{user?.firstname}</p>
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
                                <Button type="text" onClick={() => window.location.href = '/login'} >LOGIN</Button>
                                <Button type="primary" onClick={() => window.location.href = '/signup'} >REGISTER</Button>
                            </ConfigProvider>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}