import React from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";

export interface NoticeTitleProps {
    orderNumber: number;
    title: string;
}

const NoticeTitle: React.FC<NoticeTitleProps> = ({orderNumber, title}) => {
    return (
        <ListGroup.Item>
        <div className="d-flex justify-content-start align-items-center">
            <p className="text-success m-0">{orderNumber}.</p>
            <p className="fw-semibold m-0">{title}</p>
        </div>
        </ListGroup.Item>
    )
}

export default NoticeTitle;