import { Button } from "antd";

export default function Notfound() {
    return (
        <div className="flex flex-col justify-center items-center min-h-svh">
            <p className="HEAD-5XL-48">Not found!!!</p>
            <Button onClick={() => window.location.href = '/'} type="primary">Back to Home</Button>
        </div>
    )
}