import {Modal} from "react-bootstrap";
import React from "react";
import {CommonModalType} from "../type/common-modal.type";

const CommonModal:React.FC<CommonModalType> = ({props, title, body}) => {
    return (
        <Modal centered show={props.show} onHide={props.onHide} backdrop="static" backdropClassName="my-backdrop" tabIndex="-1">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
        </Modal>
    )
}
export default CommonModal;