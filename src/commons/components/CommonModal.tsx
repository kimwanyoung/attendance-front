import {Modal} from "react-bootstrap";
import React from "react";
import {CommonModalType} from "../type/common-modal.type";

const CommonModal:React.FC<CommonModalType> = ({props, title, body}) => {
    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton closeVariant="white" className="bg-dark text-white">
                <Modal.Title className="bg-dark text-white">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">{body}</Modal.Body>
        </Modal>
    )
}
export default CommonModal;