// 로그인, 로그아웃 모두 여기서 처리한다!
import React, {useState} from 'react'
import {Checkbox, Input, Modal, Button, Form} from "antd";
import {Link} from "react-router-dom";
import Axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userAction";

const AuthModal = () => {
    const [type, setType] = useState("login")
    const [visible, setVisible] = useState(true)

    // const {token, user} = useSelector(state => ({
    //     token: state.userReducer.token,
    //     user: state.userReducer.user,
    // }))
    const dispatch = useDispatch()
    const onLogin = (data) => dispatch(login(data));

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
                setVisible(false)
            }
            catch (err){
                console.log(err)
            }
        }
        fn()
    }

    const Signup = (values) => {
        async function fn() {
            const {email, username, password} = values;
            const data = {email, username, password}
            try{
                console.log(data)
                const apiRoot = "http://localhost:8000/account/signup/"
                const response = await Axios.post(apiRoot, data)
                console.log(response)
                setVisible(false)
            }
            catch (err){
                console.log(err)
            }
        }
        fn()
    }

    return (
        <div>
            {type === "login" ? <Modal
                title={"Pinterest 에 오신 걸 환영합니다!"}
                visible={visible}
                onCancel={()=>setVisible(false)}
                footer={
                    <Link onClick={() => {setType('signup')}}>
                        아직 Pinterest 를 사용하고 있지 않으신가요? 가입하기
                    </Link>
                }
            >
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
                        <Button type="primary" htmlType="submit">
                            로그인
                        </Button>
                        <div>또는</div>
                        <Button>FaceBook</Button>
                    </Form.Item>
                </Form>
                <div>

                </div>
            </Modal>
            :<Modal
                    title={"Pinterest 에 오신 걸 환영합니다!"}
                    visible={visible}
                    onCancel={()=>setVisible(false)}
                    footer={<Link onClick={() => {setType('login')}}>이미 회원이신가요? 로그인하기</Link>}
                >
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
                            <Button type="primary" htmlType="submit">
                                회원가입
                            </Button>
                            <div>또는</div>
                            <Button>FaceBook</Button>
                        </Form.Item>
                    </Form>
                    <div>

                    </div>
                </Modal>

            }

        </div>
    )
}
export default AuthModal