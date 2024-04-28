import Form from "react-bootstrap/Form";
import {Button, Modal} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useLocation, useParams} from "react-router-dom";
import {formatDate} from "../utils/convertDate";
import {CreatePostProps, PostModalProps} from "./types/PostTypes";
import {ManageToken} from "../utils/manageToken";
import AddressModal from "../commons/components/AddressModal";
import {Address} from "react-daum-postcode";
import CommonModal from "../commons/components/CommonModal";

const CreatePostModal: React.FC<PostModalProps> = ({show, onHide}) => {
    const location = useLocation();
    const [addressShow, setAddressShow] = useState(false);
    const [formValidate, setFormValidate] = useState(false);
    const [unAuthorizationModal, setUnAuthorizationModal] = useState(false);
    const [createPostData, setCreatePostData] = useState<CreatePostProps>({
        title: '',
        contents: '',
        location: '',
        eventDate: formatDate(new Date()),
        voteDuration: 1,
    });

    const handleChangeCreatePostInput = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setCreatePostData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleAddressModal = () => {
        setAddressShow(prevState => !prevState);
    }

    const handleAddress = (data: Address) => {
        setCreatePostData((prevState) => ({
            ...prevState,
            location: data.address,
        }))
    }

    const createPost = async () => {
        const splitedLocation = location.pathname.split("/");
        return await axios.post(`${HOST}/post/${splitedLocation[splitedLocation.length - 1]}`, createPostData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }

    const handleCreatePostBtn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            setFormValidate(true);
            return;
        }

        try {
            await createPost();
        } catch (error: any) {
            if (error.response.status === 401 && error.response.data.message.includes("권한이")) {
                setUnAuthorizationModal(true);
            }
            if (error.response.status === 401 && error.response.data.message.includes("토큰")) {
                await ManageToken.rotateToken();
                await createPost();
            }
        }
        onHide();
    }

    const unAuthorizationModalProps = {
        onHide: () => setUnAuthorizationModal(prevState => !prevState),
        show: unAuthorizationModal
    }

    return (
        <>
            <Modal show={show} onHide={onHide} animation={true} centered>
                <Form onSubmit={handleCreatePostBtn} noValidate validated={formValidate} className="bg-dark text-white">
                    <Modal.Header closeButton closeVariant="white">
                        <Modal.Title>일정 생성</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>일정명</Form.Label>
                            <Form.Control type="text" name="title" value={createPostData.title}
                                          className="text-white bg-dark"
                                          onChange={handleChangeCreatePostInput}
                                          placeholder="원하시는 일정명을 입력해주세요."
                                          required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>일정 설명</Form.Label>
                            <Form.Control
                                className="text-white bg-dark"
                                required
                                as="textarea" name="contents" value={createPostData.contents}
                                onChange={handleChangeCreatePostInput} rows={3}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <Form.Label className="mb-0">장소</Form.Label>
                                <Button variant="success" size="sm" onClick={handleAddressModal}>주소 검색</Button>
                            </div>
                            <AddressModal show={addressShow} onHide={handleAddressModal} handleAddress={handleAddress}/>
                            <Form.Control
                                required
                                className="text-white bg-dark" type="text" disabled={true} name="location"
                                value={createPostData.location}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>날짜</Form.Label>
                            <Form.Control
                                className="text-white bg-dark"
                                required
                                type="DATE" name="eventDate" value={createPostData.eventDate}
                                onChange={handleChangeCreatePostInput}
                                style={{colorScheme: "dark"}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>투표 기간(일)</Form.Label>
                            <Form.Control
                                required
                                className="text-white bg-dark"
                                type="text" name="voteDuration" value={createPostData.voteDuration}
                                onChange={handleChangeCreatePostInput}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            생성
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <CommonModal props={unAuthorizationModalProps} title="권한 에러" body="글 작성 권한이 없습니다."/>
        </>
    )
}

export default CreatePostModal;