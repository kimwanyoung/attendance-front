import Form from "react-bootstrap/Form";
import InputForm from "../commons/components/InputForm";
import InputSelect from "../commons/components/InputSelect";
import {Button, Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {Gender} from "../types/gender.enum";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import CommonModal from "../commons/components/CommonModal";

interface RegisterProps {
    email: string;
    password: string;
    name: string;
    gender: Gender;
    phone: string;
}

const Register = () => {
    const genders = [Gender.MALE, Gender.FEMALE];
    const [validated, setValidated] = useState(false);
    const [register, setRegister] = useState<RegisterProps>({
        email: '',
        password: '',
        name: '',
        gender: Gender.MALE,
        phone: '',
    })
    const [duplicateEmailModalOpen, setDuplicateEmailModalOpen] = useState(false);
    const [duplicatePhoneModalOpen, setDuplicatePhoneModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setRegister(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            const response = await axios.post(`${HOST}/auth/register`, {
                ...register
            });

            if(response.status === 201) {
                const {accessToken, refreshToken} = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                navigate('/groups');
            }
        } catch (err: any) {
            console.error(err);
            if(err.response.status === 400) {
                if(err.response.data.message.includes("존재하는 이메일입니다.")) {
                    setDuplicateEmailModalOpen(true);
                }
                if(err.response.data.message.includes("존재하는 휴대전화입니다.")) {
                    setDuplicatePhoneModalOpen(true);
                }
            }
        }
    }

    const duplicateEmailModalProps = {
        onHide: () => setDuplicateEmailModalOpen(prevState => !prevState),
        show: duplicateEmailModalOpen,
    }
    const duplicatePhoneModalProps = {
        onHide: () => setDuplicatePhoneModalOpen(prevState => !prevState),
        show: duplicatePhoneModalOpen,
    }

    return (
        <>
        <Container className="d-flex flex-column justify-content-center text-white" style={{minHeight: "100vh"}}>
            <h3>회원가입</h3>
            <Form style={{minWidth: "100%"}} onSubmit={onSubmit} noValidate validated={validated}>
                <InputForm required title="이메일" name="email" value={register.email} inputType="email" onChange={handleChange}/>
                <InputForm required title="비밀번호" name="password" value={register.password} inputType="password" onChange={handleChange}/>
                <InputForm required title="이름" name="name" value={register.name} inputType="text" onChange={handleChange}/>
                <InputSelect title="성별" name="gender" value={register.gender}  options={genders} onChange={handleChange}/>
                <InputForm required title="전화번호" name="phone" value={register.phone} inputType="text" onChange={handleChange}/>
                <div className="d-grid mt-2">
                    <Button variant="success" size="lg" type="submit">회원가입</Button>
                </div>
            </Form>
            <div className="d-flex justify-content-end">
                <p className="me-1">이미 회원이신가요?</p>
                <Link className="text-decoration-none" to="/">로그인</Link>
            </div>
        </Container>
            <CommonModal props={duplicateEmailModalProps} title="중복 에러" body="중복된 이메일입니다." />
            <CommonModal props={duplicatePhoneModalProps} title="중복 에러" body="중복된 전화번호입니다." />
        </>
    )
}

export default Register;