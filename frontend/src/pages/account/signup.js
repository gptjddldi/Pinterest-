import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {login} from "../../actions/userAction";
import Axios from "axios";
import {Button, Form, Input, Modal} from "antd";
import {Link, useHistory} from "react-router-dom";
import './login.scss'

export default function Signup() {
    const history = useHistory()

    const Signup = (values) => {
        async function fn() {
            const {email, username, password} = values;
            const data = {email, username, password}
            try{
                console.log(data)
                const apiRoot = "http://localhost:8000/account/signup/"
                const response = await Axios.post(apiRoot, data)
                console.log(response)
            }
            catch (err){
                console.log(err)
            }
            history.push('/account/login')
        }
        fn()
    }

    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={Signup}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: '이메일을 빠뜨리셨어요!' }]}

                >
                    <Input placeholder="이메일" />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '사용자 이름을 입력해주세요.' }]}

                >
                    <Input placeholder="사용자 이름" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password placeholder="비밀번호"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign up
                    </Button>
                    <div>또는</div>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        FaceBook
                    </Button>
                    <Link to={"/account/login"}>이미 회원이신가요? 로그인하기</Link>
                </Form.Item>
            </Form>
        </div>
    )
}