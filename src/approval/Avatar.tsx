import { Container, Card, Button, Image } from "react-bootstrap";
import React from "react";
import { AvatarType } from "../types/user.type";
import { ApprovalEnum } from "../types/approval.enum";
import axios from "axios";
import { HOST } from "../const/global.const";

const Avatar: React.FC<AvatarType> = ({ id, userId, groupId, name, gender, email, phone, onClick }) => {
    const handleClickButton = async (type: ApprovalEnum) => {
        console.log(userId);
        const response = await axios.post(`${HOST}/group/${groupId}/membership/approval?userId=${userId}&status=${type}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        onClick(id);
        return response.data;
    };

    return (
        <Container className="mt-3">
            <Card className="text-center shadow" style={{ padding: '0.5rem' }}>
                <Card.Header className="bg-success text-white">승인 대기중</Card.Header>
                <Card.Body>
                    <Image src="https://via.placeholder.com/150" roundedCircle width="80" height="80" />
                    <Card.Title className="mt-2">{name}</Card.Title>
                    <Card.Text>{email}</Card.Text>
                    <Card.Text className="text-muted">{phone}</Card.Text>
                    <Button variant="outline-success" className="m-1" onClick={() => handleClickButton(ApprovalEnum.APPROVED)}>승인</Button>
                    <Button variant="outline-danger" className="m-1" onClick={() => handleClickButton(ApprovalEnum.REJECTED)}>거절</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Avatar;
