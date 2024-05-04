import {ModalProps} from "react-bootstrap/Modal";

interface CommonModalType {
    props: ModalProps;
    title: string;
    body: string;
    button?: boolean;
    anyMethod?: any;
}

export type {CommonModalType};