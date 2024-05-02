import {ModalProps} from "react-bootstrap/Modal";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useLocation, useParams} from "react-router-dom";
import {ManageToken} from "../utils/manageToken";
import CommonModal from "../commons/components/CommonModal";

const NoticeUpdateModal: React.FC<ModalProps> = ({show, onHide}) => {
    const {groupId, noticeId} = useParams();
    const [unauthorizationModalShow, setUnauthorizationModalShow] = useState(false);
    const [noticeData, setNoticeData] = useState({
        title: "",
        contents: "",
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

        try {
            await axios.patch(`${HOST}/group/${groupId}/notice/${noticeId}`, noticeData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
        } catch (error: any) {
            if (error.response?.status === 401) {
                if (error.response.data.message.includes("권한")) {
                    setUnauthorizationModalShow(true);
                } else {
                    await ManageToken.rotateToken();
                    await axios.patch(`${HOST}/group/${groupId}/notice/${noticeId}`, noticeData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }
                    })
                }
            } else {
                console.error("수정 중 예외 발생:", error);
            }
        }
    }


    return (
        <>
            <Modal show={show} onHide={onHide} animation={true} centered>
                <Form onSubmit={handleSubmitNoticeForm} className="bg-dark text-white">
                    <Modal.Header closeButton closeVariant="white">
                        <Modal.Title>공지사항 수정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>제목</Form.Label>
                            <Form.Control className="bg-dark text-white" type="text" name="title"
                                          value={noticeData.title}
                                          onChange={handleChangeNotice}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>본문</Form.Label>
                            <Form.Control className="bg-dark text-white" as="textarea" name="contents"
                                          value={noticeData.contents}
                                          onChange={handleChangeNotice} rows={3}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={onHide} type="submit">
                            수정
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <CommonModal
                props={{
                    show: unauthorizationModalShow,
                    onHide: () => setUnauthorizationModalShow(prevState => !prevState)
                }}
                title="권한 에러"
                body="공지사항 수정 권한이 없습니다."
            />
        </>
    )
}

export default NoticeUpdateModal;