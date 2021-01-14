// import {Button, Form, Input} from "antd";
// import React from "react";
//
// <div className={props.className}>
//     <Form
//         name="normal_login"
//         className="login-form"
//         initialValues={{ remember: true }}
//         onFinish={Signup}
//     >
//         <Form.Item
//             name="email"
//             rules={[{ required: true, message: '이메일을 빠뜨리셨어요!' }]}
//
//         >
//             <Input placeholder="이메일" />
//         </Form.Item>
//         <Form.Item
//             name="username"
//             rules={[{ required: true, message: '사용자 이름을 입력해주세요.' }]}
//
//         >
//             <Input placeholder="사용자 이름" />
//         </Form.Item>
//         <Form.Item
//             name="password"
//             rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
//         >
//             <Input.Password placeholder="비밀번호"/>
//         </Form.Item>
//
//         <Form.Item>
//             <Button type="primary" htmlType="submit" className="login-form-button">
//                 Sign up
//             </Button>
//             <div>또는</div>
//             <Button type="primary" htmlType="submit" className="login-form-button">
//                 FaceBook
//             </Button>
//             <div onClick={() => props.toLoginClick()}>이미 회원이신가요? 로그인하기</div>
//         </Form.Item>
//     </Form>
// </div>