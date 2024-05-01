import {Card} from "react-bootstrap";
import React from "react";
import {NoticeCardType} from "../types/notice-card.type";
import {textConverter} from "../utils/textConverter";

const NoticeCard:React.FC<NoticeCardType> = ({title, contents, updatedAt, createdAt}) => {
    return (
        <Card className="mt-2" style={{minWidth: "100%"}} border="success" >
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                    <Card.Title className="m-0  fs-6">{title}</Card.Title>
                    <Card.Text className="text-muted m-0">
                        {textConverter(contents)}
                    </Card.Text>
                </div>
                <Card.Text className="text-success">
                    {updatedAt.toLocaleString().split("T")[0]}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NoticeCard;