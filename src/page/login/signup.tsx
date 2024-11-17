import { Form, Input, Row, Col, Button } from "antd";
import { RegisterForm } from "../../types/Auth";

export default function Signup() {
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-svh">
                <div>
                    <p className="HEAD-5XL-48 pb-12 text-04244A">Get started with AmityWorkSpace</p>
                    <Form
                        name="register"
                        layout="vertical"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item<RegisterForm>
                                    label="Firstname"
                                    name="firstname"
                                    rules={[{ required: true, message: 'Please input your firstname!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<RegisterForm>
                                    label="Lastname"
                                    name="lastname"
                                    rules={[{ required: true, message: 'Please input your lastname!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item<RegisterForm>
                            label="Phone Number"
                            name="phone_number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<RegisterForm>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<RegisterForm>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={null} className=" justify-items-center">
                            <Button type="primary" htmlType="submit"> Create Account </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </>
    )
}