import {ModalProps} from "react-bootstrap/Modal";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useLocation} from "react-router-dom";

const CreateNoticeModal:React.FC<ModalProps> = ({show, onHide}) => {
    const location = useLocation();
    const [noticeData, setNoticeData] = useState({
        title:"",
        contents:"",
    });

    const handleChangeNotice = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setNoticeData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmitNoticeForm = async (event: FormEvent) => {
        event.preventDefault();

        const pathName = location.pathname.split("/")
        const groupId = pathName[pathName.length - 1];
        try {

            const response = await axios.post(`${HOST}/notice/${groupId}`, noticeData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Modal show={show} onHide={onHide} animation={true} centered>
            <Form onSubmit={handleSubmitNoticeForm} className="bg-dark text-white">
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>공지사항 작성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>제목</Form.Label>
                        <Form.Control className="bg-dark text-white" type="text" name="title" value={noticeData.title}
                                      onChange={handleChangeNotice}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>본문</Form.Label>
                        <Form.Control className="bg-dark text-white" as="textarea" name="contents" value={noticeData.contents}
                                      onChange={handleChangeNotice} rows={3}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={onHide} type="submit">
                        생성
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateNoticeModal;