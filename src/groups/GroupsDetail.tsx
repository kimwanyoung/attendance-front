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
import {calculateTimeDifference} from "../utils/convertDate";

const GroupsDetail = () => {
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
        console.log(response.data);
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
        <ListGroup variant='flush'>
            <ListGroup.Item className="container w-100 fw-semibold d-flex align-items-center justify-content-between"
                            variant="success">
                일정 목록
                <Button variant="success" size="sm" onClick={handleModalOpen}>일정 생성</Button>
            </ListGroup.Item>
            <Container>
                {posts.map(post => {
                    return <PostCard groupId={Number(param.id)} id={post.id} key={post.id} title={post.title}
                                     contents={post.contents}
                                     createdAt={post.createdAt} endDate={post.endDate} author={post.author} timeDifference={calculateTimeDifference(new Date(post.createdAt))}/>
                })}
                <CreatePostModal show={show} onHide={handleModalOpen}/>
            </Container>
        </ListGroup>
    );
}

export default GroupsDetail;