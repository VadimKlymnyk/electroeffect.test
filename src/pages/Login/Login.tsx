import React from 'react';
import { Button, Form, Input } from 'antd';
import { login } from '../../api/request';
import {forwardTo} from "../../utils/utils";
import { loginParams} from '../../utils/interfaces'


export const Login: React.FC = () => {
    const [form] = Form.useForm();

    const onSignUp = () => {
        forwardTo('/sign_up')
    }

    const onFinish = async (value: loginParams) => {
        try {
            const response = await login(value)
            if(response) forwardTo('/todo_list')
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    return (
        <main className="main">
            <Form
                style={{ width: '250px' }}
                name="login"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Username required!', },]}
                >
                    <Input placeholder='Username'/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true,message: 'Password required!',},]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>
                <Form.Item >
                    <div className='button-area'>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                        <Button type="primary" onClick={onSignUp}  className="login-form-button">
                            Sign up
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </main>
    );
}
