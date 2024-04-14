import ListGroup from "react-bootstrap/esm/ListGroup";
import GlobalPagination from "../commons/components/GlobalPagination";
import {Container} from "react-bootstrap";
import PostCard, {PostCardProps} from "../commons/components/PostCard";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {HOST} from "../const/global.const";
import axios from "axios";
import {retryRequest} from "../utils/manageToken";

const GroupsDetail = () => {
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    const param = useParams();

    const findAllPostsByGroupId = useCallback(async () => {
        const groupId = Number(param.id);
        const response = await axios.get(`${HOST}/post/${groupId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }, [param.id]);  // param.id가 변경될 때만 함수를 재생성

    const getAllPosts = useCallback(async () => {
        try {
            const postsData = await findAllPostsByGroupId();
            setPosts(postsData);
            console.log(postsData);
        } catch (err) {
            try {
                await retryRequest(err);
                const retryPosts = await findAllPostsByGroupId();
                setPosts(retryPosts);
            } catch (error) {
                console.error('재요청 에러 발생.');
            }
        }
    }, [findAllPostsByGroupId]);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return (
        <>
            <ListGroup variant='flush'>
                <ListGroup.Item className="fw-semibold" variant="success">공지사항</ListGroup.Item>
                <ListGroup.Item >Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
            <GlobalPagination />
            <ListGroup variant='flush'>
                <ListGroup.Item className="fw-semibold" variant="success">일정 목록</ListGroup.Item>
                <Container>
                {posts.map(post => {
                    return <PostCard id={post.id} key={post.id} title={post.title} contents={post.contents} startData={post.startData} endDate={post.endDate} author={post.author}/>
                })}
                </Container>
            </ListGroup>
        </>
    );
}

export default GroupsDetail;