import React, {useState} from 'react'
import {Button, Form, Input, Modal} from "antd";
import {useDispatch} from "react-redux";
import {login} from "../../actions/userAction";
import Axios from "axios";
import {Link, useHistory, useLocation} from "react-router-dom";
import './login.scss'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function Login(props) {

    const history = useHistory()
    const location = useLocation()

    const dispatch = useDispatch()
    const onLogin = (data) => dispatch(login(data));

    const {from: loginRedirectUrl} = location.state || {from: {pathname: "/"}}


    const Login = (values) => {
        async function fn() {
            const {email, password} = values;
            const data = {email, password}
            try{
                console.log(data)
                const apiRoot = "http://localhost:8000/account/login/"
                const response = await Axios.post(apiRoot, data)
                console.log(response)
                onLogin(response.data)
            }
            catch (err){
                console.log(err)
            }
            history.push(loginRedirectUrl)
        }
        fn()
    }

    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={Login}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: '이메일을 빠뜨리셨어요!' }]}

                >
                    <Input placeholder="이메일" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                >
                    <Input.Password placeholder="비밀번호"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <div>또는</div>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        FaceBook
                    </Button>
                    <div onClick={props.onSignupClick}>아직 Pinterest 를 사용하고 있지 않으신가요? 가입하기</div>
                </Form.Item>
            </Form>
        </div>
    )
}