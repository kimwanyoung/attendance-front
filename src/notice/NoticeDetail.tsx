import { Container } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { NoticeCardType } from "../types/notice-card.type";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { HOST } from "../const/global.const";
import { ManageToken } from "../utils/manageToken";
import NoticeUpdateModal from "./NoticeUpdateModal";
import CommonModal from "../commons/components/CommonModal";

type ModalInfoType = {
    updateNoticeShow: boolean;
    deleteNoticeShow: boolean;
    unauthorizationShow: boolean;
};

const NoticeDetail = () => {
    const navigate = useNavigate();
    const { groupId, noticeId } = useParams();
    const [modalInfo, setModalInfo] = useState({
        updateNoticeShow: false,
        deleteNoticeShow: false,
        unauthorizationShow: false
    });
    const [noticeData, setNoticeData] = useState<NoticeCardType>({
        contents: "",
        createdAt: "",
        id: 0,
        title: "",
        author: { name: "" }
    });

    const toggleModal = (modalName: keyof ModalInfoType) => {
        setModalInfo(prev => ({ ...prev, [modalName]: !prev[modalName] }));
    };

    const fetchNoticeDetail = useCallback(async () => {
        try {
            const response = await axios.get(`${HOST}/group/${groupId}/notice/${noticeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setNoticeData(response.data);
        } catch (error) {
            await ManageToken.rotateToken();
            const response = await axios.get(`${HOST}/group/${groupId}/notice/${noticeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setNoticeData(response.data);
        }
    }, [groupId, noticeId]);

    const deleteNotice = async () => {
        try {
            await axios.delete(`${HOST}/group/${groupId}/notice/${noticeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            toggleModal('deleteNoticeShow');
        } catch (error: any) {
            if (error.response?.status === 401) {
                if (error.response.data.message.includes("권한")) {
                    toggleModal('unauthorizationShow');
                } else {
                    await ManageToken.rotateToken();
                    await deleteNotice();
                }
            } else {
                console.error("삭제 중 예외 발생:", error);
            }
        }
    };

    useEffect(() => {
        fetchNoticeDetail().catch(console.error);
    }, [fetchNoticeDetail]);

    return (
        <>
            <Container className="p-3 overflow-y-scroll min-vh-100">
                <article className="text-white">
                    <header className="mb-4 d-flex justify-content-between">
                        <div>
                            <h1 className="fw-bolder mb-1">{noticeData.title}</h1>
                            <div className="text-muted fst-italic mt-1">
                                생성일: {noticeData.createdAt.split("T")[0]}
                            </div>
                            <div className="text-muted fst-italic mt-1">
                                생성자: {noticeData.author?.name}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: "3rem" }}>
                            <p onClick={() => toggleModal('updateNoticeShow')}>수정</p>
                            <p onClick={deleteNotice}>삭제</p>
                        </div>
                    </header>
                    <figure className="mb-1">
                        <p>{noticeData.contents}</p>
                    </figure>
                </article>
            </Container>
            <NoticeUpdateModal show={modalInfo.updateNoticeShow} onHide={() => toggleModal('updateNoticeShow')} />
            <CommonModal
                props={{
                    show: modalInfo.deleteNoticeShow,
                    onHide: () => {
                        toggleModal('deleteNoticeShow');
                        navigate(-1);
                    }
                }}
                title="공지사항 삭제"
                body="삭제가 완료되었습니다."
            />
            <CommonModal
                props={{
                    show: modalInfo.unauthorizationShow,
                    onHide: () => toggleModal('unauthorizationShow')
                }}
                title="권한 에러"
                body="공지사항 삭제 권한이 없습니다."
            />
        </>
    )
};

export default NoticeDetail;
