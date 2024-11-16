import { Link } from "react-router-dom";
import { IoCall } from "react-icons/io5";

export default function Footer() {
    return (
        <>
            <div className="bg-04244A grid grid-cols-5 grid-rows-1 px-16 py-14">
                <div className="col-span-2 place-items-center"><img src="workspaceamity-full.svg" alt="" className="w-96" /></div>
                <div>
                    <p className="font-bold text-white HEAD-3XL-30">About Us</p>
                    <Link to="/" className="text-white block CONTENT-XL-20">About Booking.com</Link>
                    <Link to="/" className="text-white block CONTENT-XL-20">How does our website work?</Link>
                    <Link to="/" className="text-white block CONTENT-XL-20">Information Center</Link>
                </div>
                <div>
                    <p className="font-bold text-white HEAD-3XL-30">Resources</p>
                    <Link to="/" className="text-white block CONTENT-XL-20">Help</Link>
                    <Link to="/" className="text-white block CONTENT-XL-20">Privacy</Link>
                </div>
                <div>
                    <p className="font-bold text-white HEAD-3XL-30">Contact Us</p>
                    <Link to="/" className="text-white CONTENT-XL-20">Call us: Thailand</Link>
                    <Link to="/" className="text-white CONTENT-XL-20"><IoCall />+(66)2 426 0413</Link>
                </div>

            </div>
            <div className=" bg-F07C41 text-04244A h-8 flex items-center justify-center">All  Rights  Reserved</div>
        </>
    )
}