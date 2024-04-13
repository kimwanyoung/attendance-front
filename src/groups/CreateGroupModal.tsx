import Form from "react-bootstrap/Form";
import {Button, Modal} from "react-bootstrap";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {retryRequest} from "../utils/manageToken";

interface CreateGroupProps {
    show: boolean
    onHide: () => void;
}

interface CreateGroupData {
    title: string;
    description: string;
}

const CreateGroupModal: React.FC<CreateGroupProps> = ({show, onHide}) => {
    const [createGroupData, setCreateGroupData] = useState<CreateGroupData>({
        title: '',
        description: '',
    });

    const handleChangeCreateGroupInput = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setCreateGroupData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const createGroup = async ()=> {
        return axios.post(`${HOST}/group`, createGroupData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }

    const handleCreateGroupBtn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createGroup();
        } catch (err: unknown) {
            await retryRequest(err, handleCreateGroupBtn, event);
        }
        window.location.reload();
    }

    return (
        <Modal show={show} onHide={onHide} animation={true} centered>
            <Form onSubmit={handleCreateGroupBtn}>
                <Modal.Header closeButton>
                    <Modal.Title>그룹 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>그룹명</Form.Label>
                        <Form.Control type="text" name="title" value={createGroupData.title}
                                      onChange={handleChangeCreateGroupInput} placeholder="원하시는 그룹명을 입력해주세요."/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>그룹 설명</Form.Label>
                        <Form.Control as="textarea" name="description" value={createGroupData.description}
                                      onChange={handleChangeCreateGroupInput} rows={3}/>
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

export default CreateGroupModal;