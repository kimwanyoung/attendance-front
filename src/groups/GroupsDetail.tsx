import ListGroup from "react-bootstrap/esm/ListGroup";
import {Container, Nav} from "react-bootstrap";
import PostCard, {PostCardProps} from "../commons/components/PostCard";
import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {HOST} from "../const/global.const";
import axios from "axios";
import {ManageToken} from "../utils/manageToken";
import {calculateTimeDifference} from "../utils/convertDate";
import "../commons/components/custom.css";
import NoticeCard from "../notice/NoticeCard";
import {NoticeCardType} from "../types/notice-card.type";
import {AiFillDelete} from "react-icons/ai";
import CommonModal from "../commons/components/CommonModal";

const GroupsDetail = () => {
    const param = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    const [notices, setNotices] = useState<NoticeCardType[]>([]);
    const [groupTitle, setGroupTitle] = useState("");
    const [isSchedule, setIsSchedule] = useState(true);
    const [confirmShow, setConfirmShow] = useState(false);
    const findAllPostsByGroupId = useCallback(async () => {
        const groupId = Number(param.id);
        const response = await axios.get<{ group: any, posts: PostCardProps[] }>(`${HOST}/group/${groupId}/post`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }, [param.id]);

    const findAllNoticeByGroupId = useCallback(async () => {
        const groupId = Number(param.id);
        const response = await axios.get<NoticeCardType[]>(`${HOST}/group/${groupId}/notice`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        return response.data;
    }, [param.id])

    const getAllPostsAndNotice = useCallback(async () => {
        try {
            const responsePostData = await findAllPostsByGroupId();
            const responseNoticeData = await findAllNoticeByGroupId();
            setPosts(responsePostData.posts);
            setNotices(responseNoticeData);
            setGroupTitle(responsePostData.group.title);
        } catch (err) {
            await ManageToken.rotateToken();
            const responsePostData = await findAllPostsByGroupId();
            const responseNoticeData = await findAllNoticeByGroupId();
            setPosts(responsePostData.posts);
            setNotices(responseNoticeData);
            setGroupTitle(responsePostData.group.title);
        }
    }, [findAllPostsByGroupId, findAllNoticeByGroupId]);

    useEffect(() => {
        getAllPostsAndNotice().catch((error) => {
            console.error(error);
        });
    }, [getAllPostsAndNotice]);

    const handleDeleteGroup = async () => {
        try {
            await axios.delete(`${HOST}/group/${param.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
        } catch (error) {
            console.error(error);
        } finally {
            navigate(-1);
        }
    }

    const deleteConfirmModalProps = {
        show: confirmShow,
        onHide: () => setConfirmShow(prevState => !prevState),
    }

    return (
        <>
            <ListGroup variant='flush' className="min-vh-100">
                <div className="d-flex align-items-center justify-content-between text-success m-0 p-3">
                    <p className="m-0">{groupTitle}</p>
                    <div className="d-flex align-items-center" onClick={() => setConfirmShow(prevState => !prevState)}>
                        <p className="m-0 me-1">삭제</p>
                        <AiFillDelete/>
                    </div>
                </div>
                <Nav variant="underline" defaultActiveKey="/home" justify
                     style={{color: "#198754 !important", borderBottom: "#198754"}}>
                    <Nav.Item>
                        <Nav.Link active={isSchedule} onClick={() => setIsSchedule(true)}>일정</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={!isSchedule} onClick={() => setIsSchedule(false)}>공지</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Container className="pb-3 overflow-y-scroll">
                    {isSchedule && posts.map(post => {
                        return <PostCard groupId={Number(param.id)} id={post.id} key={post.id} title={post.title}
                                         contents={post.contents}
                                         createdAt={post.createdAt} endDate={post.endDate} author={post.author}
                                         timeDifference={calculateTimeDifference(new Date(post.createdAt))}/>
                    })}
                    {!isSchedule && notices.map(notice => {
                        return <NoticeCard id={notice.id} key={notice.id} title={notice.title}
                                           contents={notice.contents}
                                           createdAt={notice.createdAt}/>
                    })}
                </Container>
            </ListGroup>
            <CommonModal props={deleteConfirmModalProps} title="삭제 확인" body="정말 삭제하시겠습니까?" anyMethod={handleDeleteGroup}
                         button/>
        </>
    );
}

export default GroupsDetail;