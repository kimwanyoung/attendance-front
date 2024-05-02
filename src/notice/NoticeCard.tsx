import {Card} from "react-bootstrap";
import React from "react";
import {NoticeCardType} from "../types/notice-card.type";
import {textConverter} from "../utils/textConverter";
import {useNavigate} from "react-router-dom";

const NoticeCard:React.FC<NoticeCardType> = ({id, title, contents, createdAt}) => {
    const navigate = useNavigate();

    return (
        <Card className="mt-2" style={{minWidth: "100%"}} border="success" onClick={() => navigate(`notice/${id}`)}>
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                    <Card.Title className="m-0  fs-6">{title}</Card.Title>
                    <Card.Text className="text-muted m-0">
                        {textConverter(contents)}
                    </Card.Text>
                </div>
                <Card.Text className="text-success">
                    {createdAt.toLocaleString().split("T")[0]}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NoticeCard;