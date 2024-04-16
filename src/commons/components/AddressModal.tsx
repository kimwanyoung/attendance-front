import DaumPostcode, {Address} from "react-daum-postcode";
import React from "react";
import Modal from "react-bootstrap/esm/Modal";
import {ModalType} from "../type/modalType";

interface AddressModalProps extends ModalType{
    handleAddress: (data: Address) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({show, onHide, handleAddress}) => {
    return (
        <Modal className="vw-100 vh-100 d-flex justify-content-center" show={show} onHide={onHide} centered>
                <DaumPostcode style={{width:"90%"}} onComplete={handleAddress}/>
        </Modal>

    )
}

export default AddressModal;