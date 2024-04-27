import ListGroup from "react-bootstrap/esm/ListGroup";
import {Container, Nav} from "react-bootstrap";
import PostCard, {PostCardProps} from "../commons/components/PostCard";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {HOST} from "../const/global.const";
import axios from "axios";
import {ManageToken} from "../utils/manageToken";
import CreatePostModal from "../posts/CreatePostModal";
import {calculateTimeDifference} from "../utils/convertDate";
import "../commons/components/custom.css";

const GroupsDetail = () => {
    const param = useParams();
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    const [groupTitle, setGroupTitle] = useState("");
    const [isSchedule, setIsSchedule] = useState(true);
    const findAllPostsByGroupId = useCallback(async () => {
        const groupId = Number(param.id);
        const response = await axios.get<{ group: any, posts: PostCardProps[] }>(`${HOST}/post/${groupId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }, [param.id]);

    const getAllPosts = useCallback(async () => {
        try {
            const responseData = await findAllPostsByGroupId();
            setPosts(responseData.posts);
            setGroupTitle(responseData.group.title);
        } catch (err) {
            await ManageToken.rotateToken();
            const responseData = await findAllPostsByGroupId();
            setPosts(responseData.posts);
            setGroupTitle(responseData.group.title);
        }
    }, [findAllPostsByGroupId]);

    useEffect(() => {
        getAllPosts().catch((error) => {
            console.error(error);
        });
    }, [getAllPosts]);

    return (
        <ListGroup variant='flush' className="min-vh-100">
            <p className="d-flex align-items-center justify-content-center text-success m-0 p-3">{groupTitle}</p>
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
            </Container>
        </ListGroup>
    );
}

export default GroupsDetail;