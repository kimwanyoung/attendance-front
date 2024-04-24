import {Button, Card, Col, Container, FloatingLabel, Form, FormGroup, Modal, Row} from "react-bootstrap";
import React, {ChangeEvent, MouseEvent, useCallback, useState} from "react";
import {ModalProps} from "react-bootstrap/Modal";
import {SearchGroupType} from "./search-group.type";
import axios from "axios";
import debounce from "lodash/debounce";
import {HOST} from "../../const/global.const";
import {ManageToken} from "../../utils/manageToken";
import {GroupListType} from "../type/group-list.type";
import CommonModal from "./CommonModal";
import "./custom.css";
import {textConverter} from "../../utils/textConverter";

const SearchGroupModal: React.FC<ModalProps> = (props) => {
    const [searchGroupInput, setSearchGroupInput] = useState<SearchGroupType>({
        groupName: "",
        groupCreatorName: "",
    });
    const [groupList, setGroupList] = useState<GroupListType[]>([]);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const postApplyGroup = async (event: MouseEvent<HTMLButtonElement>) => {
        const groupId = event.currentTarget.id;
        const response = await axios.post(`${HOST}/membership/apply/${groupId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        return response.data;
    }

    const validatePostApplyGroup = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            await postApplyGroup(event);
            props.onHide && props.onHide();
            setSuccessModalOpen(prevState => !prevState);
        } catch (error) {
            await ManageToken.rotateToken();
            await postApplyGroup(event);
            props.onHide && props.onHide();
            setSuccessModalOpen(prevState => !prevState);
        }
    }

    const getGroupsByName = async (value: SearchGroupType) => {
        const response = await axios.get(`${HOST}/group?groupName=${value.groupName}&groupCreatorName=${value.groupCreatorName}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }

    const validateGetGroupsByName = useCallback(async (value: SearchGroupType) => {
        try {
            return await getGroupsByName(value);
        } catch (error) {
            await ManageToken.rotateToken();
            return await getGroupsByName(value);
        }
    }, []);

    const callBackDebouncedSearch = useCallback(debounce(async (value: SearchGroupType) => {
        setGroupList(await validateGetGroupsByName(value));
    }, 2000), [validateGetGroupsByName]);

    const onChangeGroupInput = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setSearchGroupInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        await callBackDebouncedSearch({...searchGroupInput, [name]: value});
    }, [callBackDebouncedSearch, searchGroupInput])

    const commonModalProps = {
        onHide: () => setSuccessModalOpen(prevState => !prevState),
        show: successModalOpen,
    }

    return (
        <>
            <Modal {...props} centered>
                <Modal.Header closeButton closeVariant="white" className="bg-dark text-white">
                    <Modal.Title>그룹 검색</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <FormGroup>
                        <Form.Label>모임명</Form.Label>
                        <Form.Control
                            className="bg-dark text-white mb-3"
                            type="text" placeholder="홍길동 조기축구회" value={searchGroupInput.groupName}
                            name="groupName"
                            onChange={onChangeGroupInput}/>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>모임장 이름</Form.Label>
                        <Form.Control
                            className="bg-dark text-white"
                            type="text" placeholder="홍길동" value={searchGroupInput.groupCreatorName}
                            name="groupCreatorName"
                            onChange={onChangeGroupInput}
                        />
                    </FormGroup>
                    <Container className="mt-3 bg-dark" style={{maxHeight: "40vh", overflow: "scroll"}}>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {groupList.map((group) => (
                                <Col key={group.id}>
                                    <Card className="text-white" style={{backgroundColor:"#202027"}}>
                                        <Card.Body className="d-flex justify-content-between">
                                            <div>
                                                <Card.Title>{textConverter(group.title)}</Card.Title>
                                                <Card.Text className="mb-1">
                                                    그룹 설명 : {textConverter(group.description)}
                                                </Card.Text>
                                                <Card.Text className="mb-1">
                                                    생성자 : {group.creator.name}
                                                </Card.Text>
                                            </div>
                                            <Button variant="success" id={group.id.toString()}
                                                    onClick={validatePostApplyGroup}>가입 신청</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
            <CommonModal props={{...commonModalProps}} title="가입 신청 완료" body="해당 그룹에 가입 신청이 완료되었습니다!"/>
        </>
    )
}

export default SearchGroupModal;