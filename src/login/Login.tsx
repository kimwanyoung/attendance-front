import InputForm from "../commons/components/InputForm";
import Form from "react-bootstrap/Form";
import {Button, Container} from "react-bootstrap";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {Link, useNavigate} from "react-router-dom";

interface LoginProps {
    email: string;
    password: string;
}

const Login = () => {
    const [login, setLogin] = useState<LoginProps>({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setLogin(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const onLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${HOST}/auth/login`, {
                email: login.email,
                password: login.password,
            });
            console.log(response);
            if(response.status === 201) {
                const {accessToken, refreshToken} = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                navigate('/groups');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container className="d-flex flex-column justify-content-center text-white" style={{minHeight: "100vh"}}>
            <h3>로그인</h3>
            <Form style={{minWidth: "100%"}} onSubmit={onLogin}>
                <InputForm title="이메일" name="email" value={login.email} inputType="email" onChange={handleChange}/>
                <InputForm title="비밀번호" name="password" value={login.password} inputType="password" onChange={handleChange}/>
                <div className="d-grid">
                    <Button variant="success" size="lg" type="submit">로그인</Button>
                </div>
            </Form>
            <div className="d-flex justify-content-end">
                <p className="me-1">아직 회원이 아니신가요?</p>
                <Link className="text-decoration-none" to="/register">회원가입</Link>
            </div>
        </Container>
    )
}

export default Login;