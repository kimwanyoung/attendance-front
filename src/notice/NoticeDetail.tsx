import {Container} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import {NoticeCardType} from "../types/notice-card.type";
import axios from "axios";
import {useParams} from "react-router-dom";
import {HOST} from "../const/global.const";
import {ManageToken} from "../utils/manageToken";
import NoticeUpdateModal from "./NoticeUpdateModal";

const NoticeDetail = () => {
    const {groupId, noticeId} = useParams();
    const [updateNoticeModalShow, setUpdateNoticeModalShow] = useState(false);
    const [noticeData, setNoticeData] = useState<NoticeCardType>({
        contents: "",
        createdAt: "",
        id: 0,
        title: "",
        author: {name: ""}
    });

    const getNoticeDetailData = useCallback(async () => {
        const response = await axios.get(`${HOST}/group/${groupId}/notice/${noticeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }, [groupId, noticeId])

    const validateGetNoticeDetailData = useCallback(async () => {
        try {
            const responseNoticeData = await getNoticeDetailData();
            setNoticeData(responseNoticeData);
        } catch (error) {
            await ManageToken.rotateToken();
            const responseNoticeData = await getNoticeDetailData();
            setNoticeData(responseNoticeData);
        }
    }, [getNoticeDetailData])

    useEffect(() => {
        validateGetNoticeDetailData().catch(error => {
            console.error("예상치 못한 에러 발생: ", error);
        });
    }, [validateGetNoticeDetailData]);

    return (
        <>
            <Container className="p-3 overflow-y-scroll min-vh-100">
                <article className="text-white">
                    <header className="mb-4 d-flex justify-content-between">
                        <div>
                            <h1 className="fw-bolder mb-1">{noticeData.title}</h1>
                            <div className="text-muted fst-italic mt-1">생성일 : {noticeData.createdAt.split("T")[0]}
                            </div>
                            <div className="text-muted fst-italic mt-1">생성자 : {noticeData.author?.name}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between" style={{width: "3rem"}}>
                            <p onClick={() => setUpdateNoticeModalShow(prevState => !prevState)}>수정</p>
                            <p>삭제</p>
                        </div>
                    </header>
                    <figure className="mb-1">
                        <p>{noticeData.contents}</p>
                    </figure>
                </article>
            </Container>
            <NoticeUpdateModal show={updateNoticeModalShow} onHide={() => setUpdateNoticeModalShow(prevState => !prevState)}/>
        </>
    )
};

export default NoticeDetail;