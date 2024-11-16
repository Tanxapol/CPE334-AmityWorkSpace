export default function Homesec2() {
    return (
        <>
            <div className="flex items-center justify-center flex-col h-dvh w-full bg-gradient">
                <div className="pb-20">
                    <p className="HEAD-5XL-48">
                        OUR PICKS FOR YOU
                    </p>
                </div>
                <div className="flex flex-row flex-wrap content-center justify-center">
                    <div className="relative">
                        <img src="/image_75.png" alt="left" className="w-96 m-3 object-cover aspect-4/3" />
                        <div className="topleft "><p>TOP 10</p></div>
                    </div>
                    <div className="relative">
                        <img src="/image_75.png" alt="mid" className="w-96 m-3 object-cover aspect-4/3" />
                        <div className="topleft"><p>NEAR YOU</p></div>
                    </div>
                    <div className=" relative">
                        <img src="/image_75.png" alt="right" className="w-96 m-3 object-cover aspect-4/3" />
                        <div className="topleft"><p>FOR YOU</p></div>
                    </div>
                </div>
            </div>
        </>
    )
}