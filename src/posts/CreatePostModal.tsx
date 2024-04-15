import Form from "react-bootstrap/Form";
import {Button, Modal} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {retryRequest} from "../utils/manageToken";
import {useParams} from "react-router-dom";
import {formatDate} from "../utils/convertDate";

interface PostModalProps {
    show: boolean
    onHide: () => void;
}

interface CreatePostProps {
    title: string;
    contents: string;
    place: string;
    startDate: string;
    votingPeriod: number;
}

const CreatePostModal: React.FC<PostModalProps> = ({show, onHide}) => {
    const param = useParams();
    const [createPostData, setCreatePostData] = useState<CreatePostProps>({
        title: '',
        contents: '',
        place: '',
        startDate: formatDate(new Date()),
        votingPeriod: 1,
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

    const handleCreateGroupBtn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createPost();
        } catch (err: unknown) {
            try {
                await retryRequest(err, handleCreateGroupBtn, event);
            } catch (err) {
                console.log('토큰 재발급 에러');
            }
        }
        window.location.reload();
    }

    return (
        <Modal show={show} onHide={onHide} animation={true} centered>
            <Form onSubmit={handleCreateGroupBtn}>
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
                        <Form.Control as="textarea" name="description" value={createPostData.contents}
                                      onChange={handleChangeCreatePostInput} rows={3}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>장소</Form.Label>
                        <Form.Control type="text" name="place" value={createPostData.contents}
                                      onChange={handleChangeCreatePostInput} placeholder="장소를 입력해주세요."/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>날짜</Form.Label>
                        <Form.Control type="DATE" name="startDate" value={createPostData.startDate}
                                      onChange={handleChangeCreatePostInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>투표 기간(일)</Form.Label>
                        <Form.Control type="text" name="votingPeriod" value={createPostData.votingPeriod}
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