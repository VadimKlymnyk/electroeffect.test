import React from 'react';
import { Button, Form, Input } from 'antd';
import { signUp } from '../../api/request.js';
import {forwardTo} from "../../utils/utils.js";

export const SignUp:React.FC = () => {
  const [form] = Form.useForm();

    const onLogin = () => {
        forwardTo('/login')
    }

    const onFinish = async (value: React.FormEvent<HTMLFormElement>) => {
        try {
            const response = await signUp(value)
            if(response) forwardTo('/login')
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

  return (
    <main className="main">
        <Form
            style={{ width: '250px' }}
            name="SignUp"
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Username required!'}]}
            >
                <Input placeholder='Username'/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[ {required: true, message: 'Password required!'}]}
            >
                <Input.Password
                    placeholder='Password'
                />
            </Form.Item>

            <Form.Item name="first_name">
                <Input placeholder='First name'/>
            </Form.Item>

            <Form.Item name="last_name">
                <Input placeholder='Last name'/>
            </Form.Item>

            <Form.Item
                name="email"
                rules={[{type: 'email',message: 'Email is not validate email!', },]}
            >
                <Input placeholder='E-mail'/>
            </Form.Item>
            <Form.Item >
                <div className='button-area'>
                    <Button type="primary" htmlType="submit"  className="login-form-button">
                        Sign up
                    </Button>
                    <Button type="primary" onClick={onLogin}  className="login-form-button">
                        Login
                    </Button>
                </div>
            </Form.Item>
        </Form>
    </main>    
  );
}
