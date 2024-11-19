import { Button, Form, FormProps, Input } from "antd";
import { LoginForm } from "../../types/Auth";
import { useEffect, useState } from "react";
import { decodedToken, login } from "../../components/utils/auth";
import { Token } from "../../types/Token";

export default function Login() {
    const [user, setUser] = useState<Token | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const decoded = await decodedToken();
            setUser(decoded);
        };

        fetchUser();

        if (user) {
            if (user.role === 'user') {
                window.location.href = '/user';
            } else if (user.role === 'staff') {
                window.location.href = '/staff';
            } else if (user.role === 'admin') {
                window.location.href = '/admin';
            }
        }
    }, []);

    const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
        console.log('Input Success:', values);
        login(values.email, values.password);
        // window.location.href = '/';
    }
    const onFinishFailed: FormProps<LoginForm>['onFinishFailed'] = (errorInfo) => {
        console.log('Input Failed:', errorInfo);
    }



    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-svh">
                <div>
                    <p className="HEAD-5XL-48 pb-12 text-04244A">Login to AmityWorkSpace</p>

                    <Form
                        name="login"
                        layout="vertical"
                        // labelCol={{ span: 80 }}
                        // wrapperCol={{ span: 100 }}
                        // style={{ width: '100%', margin: 'auto' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<LoginForm>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<LoginForm>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item label={null} className=" justify-items-center">
                            <Button type="primary" htmlType="submit"> Login </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}