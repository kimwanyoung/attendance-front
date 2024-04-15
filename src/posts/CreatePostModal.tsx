import Form from "react-bootstrap/Form";
import {Button, Modal} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useParams} from "react-router-dom";
import {formatDate} from "../utils/convertDate";
import {CreatePostProps, PostModalProps} from "./types/PostTypes";
import {ManageToken} from "../utils/manageToken";

const CreatePostModal: React.FC<PostModalProps> = ({show, onHide}) => {
    const param = useParams();
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

    const createPost = async ()=> {
        return axios.post(`${HOST}/post/${param.id}`, createPostData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }

    const handleCreatePostBtn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createPost();
        } catch (err: unknown) {
            await ManageToken.rotateToken();
            await createPost();
        }
        window.location.reload();
    }

    return (
        <Modal show={show} onHide={onHide} animation={true} centered>
            <Form onSubmit={handleCreatePostBtn}>
                <Modal.Header closeButton>
                    <Modal.Title>일정 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>일정명</Form.Label>
                        <Form.Control type="text" name="title" value={createPostData.title}
                                      onChange={handleChangeCreatePostInput} placeholder="원하시는 일정명을 입력해주세요."/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>일정 설명</Form.Label>
                        <Form.Control as="textarea" name="contents" value={createPostData.contents}
                                      onChange={handleChangeCreatePostInput} rows={3}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>장소</Form.Label>
                        <Form.Control type="text" name="location" value={createPostData.location}
                                      onChange={handleChangeCreatePostInput} placeholder="장소를 입력해주세요."/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>날짜</Form.Label>
                        <Form.Control type="DATE" name="eventDate" value={createPostData.eventDate}
                                      onChange={handleChangeCreatePostInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>투표 기간(일)</Form.Label>
                        <Form.Control type="text" name="voteDuration" value={createPostData.voteDuration}
                                      onChange={handleChangeCreatePostInput}/>
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

export default CreatePostModal;