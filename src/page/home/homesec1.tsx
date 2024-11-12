import { Input } from "antd";

const { Search } = Input;


export default function Homesec1() {
    return (
        <>
            <div className="flex flex-row flex-wrap items-center h-dvh w-full p-10 bg-gradient-to-r from-gradient to-gd">
                {/* left section */}
                <div className=" basis-1/2">
                    <div className="justify-self-end flex-0">
                        <img src="/image_75.png" alt="left-top" className="w-80 p-3" />
                        <hr className="w-full mx-3 h-1 bg-F07C41 border-F07C41" />
                    </div>
                    <div className="justify-self-end">
                        <img src="/image_75.png" alt="left-buttom" className="w-44 p-3" />
                        <hr className="w-full mx-3 h-1 bg-F07C41 border-F07C41" />
                    </div>
                    <div>
                        <p className="heading-48 px-3">Find a coworking space you’ll love</p>
                        <Search placeholder="search" className="px-3" />
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
        </>
    )
}