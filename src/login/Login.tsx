import InputForm from "../commons/components/InputForm";
import Form from "react-bootstrap/Form";
import {Button, Container} from "react-bootstrap";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {Link, useNavigate} from "react-router-dom";
import CommonModal from "../commons/components/CommonModal";

interface LoginProps {
    email: string;
    password: string;
}

const Login = () => {
    const [validate, setValidate] = useState(false);
    const [login, setLogin] = useState<LoginProps>({
        email: '',
        password: '',
    });
    const [loginValidate, setLoginValidate] = useState(false);
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

        const form = event.currentTarget;
        if(!form.checkValidity()) {
            event.stopPropagation();
            setValidate(true);
            return;
        }

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
        } catch (err: any) {
            if(err.response.status === 400) {
                setLoginValidate(true);
            }
            console.error(err);
        }
    }

    const validateLoginModalProps = {
        onHide: () => setLoginValidate(prevState => !prevState),
        show: loginValidate,
    }

    return (
        <>
        <Container className="d-flex flex-column justify-content-center text-white" style={{minHeight: "100vh"}}>
            <h3>로그인</h3>
            <Form style={{minWidth: "100%"}} noValidate validated={validate} onSubmit={onLogin}>
                <InputForm required title="이메일" name="email" value={login.email} inputType="email" onChange={handleChange}/>
                <InputForm  required title="비밀번호" name="password" value={login.password} inputType="password" onChange={handleChange}/>
                <div className="d-grid">
                    <Button variant="success" size="lg" type="submit">로그인</Button>
                </div>
            </Form>
            <div className="d-flex justify-content-end">
                <p className="me-1">아직 회원이 아니신가요?</p>
                <Link className="text-decoration-none" to="/register">회원가입</Link>
            </div>
        </Container>
            <CommonModal props={validateLoginModalProps} title="아이디, 비밀번호 에러" body="아미디 및 비밀번호를 확인해주세요." />
        </>
    )
}

export default Login;