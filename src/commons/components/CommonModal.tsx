import {Button, Modal} from "react-bootstrap";
import React from "react";
import {CommonModalType} from "../type/common-modal.type";

const CommonModal: React.FC<CommonModalType> = ({props, title, body, button,anyMethod}) => {
    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton closeVariant="white" className="bg-dark text-white">
                <Modal.Title className="bg-dark text-white">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">{body}</Modal.Body>
            {
                button &&
                <Modal.Footer className="bg-dark text-white" onClick={() => {
                    props.onHide && props.onHide();
                    anyMethod();
                }}>
                    <Button variant="success">확인</Button>
                </Modal.Footer>
            }
        </Modal>
    )
}
export default CommonModal;