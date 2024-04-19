import ListGroup from "react-bootstrap/esm/ListGroup";
import {Button, Container} from "react-bootstrap";
import PostCard, {PostCardProps} from "../commons/components/PostCard";
import {useCallback, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {HOST} from "../const/global.const";
import axios from "axios";
import {ManageToken} from "../utils/manageToken";
import CreatePostModal from "../posts/CreatePostModal";
import NoticeTitle, {NoticeTitleProps} from "../notice/NoticeTitle";

const mockNotices: NoticeTitleProps[] = [
    {
        orderNumber: 1,
        title: '중요 공지사항 남깁니다.',
    },
    {
        orderNumber: 2,
        title: '이번주 경기 일정.',
    },{
        orderNumber: 3,
        title: '부상자 명단.',
    },

]

const GroupsDetail = () => {
    const location = useLocation();
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    const param = useParams();
    const [show, setShow] = useState(false);
    const handleModalOpen = () => {
        setShow(prevState => !prevState);
    };
    const findAllPostsByGroupId = useCallback(async () => {
        const groupId = Number(param.id);
        const response = await axios.get(`${HOST}/post/${groupId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }, [param.id]);

    const getAllPosts = useCallback(async () => {
        try {
            setPosts(await findAllPostsByGroupId());
        } catch (err) {
            await ManageToken.rotateToken();
            setPosts(await findAllPostsByGroupId());
        }
    }, [findAllPostsByGroupId]);

    useEffect(() => {
        getAllPosts().catch((error) => {
            console.error(error);
        });
    }, [getAllPosts]);

    return (
        <>
            <ListGroup variant='flush'>
                <ListGroup.Item className="fw-bold" variant="success">공지사항</ListGroup.Item>
                {mockNotices.map((notice) => (
                    <NoticeTitle key={notice.orderNumber} orderNumber={notice.orderNumber} title={notice.title} />
                ))}
            </ListGroup>
            <ListGroup variant='flush'>
                <ListGroup.Item className="fw-semibold d-flex align-items-center justify-content-between" variant="success">
                    일정 목록
                    <Button variant="success" size="sm" onClick={handleModalOpen}>일정 생성</Button>
                </ListGroup.Item>
                <Container>
                    {posts.map(post => {
                        return <PostCard groupId={Number(param.id)} id={post.id} key={post.id} title={post.title} contents={post.contents}
                                         startData={post.startData} endDate={post.endDate} author={post.author} memberCount={location.state}/>
                    })}
                    <CreatePostModal show={show} onHide={handleModalOpen}/>
                </Container>
            </ListGroup>
        </>
    );
}

export default GroupsDetail;