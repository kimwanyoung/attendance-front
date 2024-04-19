import React, {useCallback, useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {PostModel} from "./types/PostTypes";
import {ManageToken} from "../utils/manageToken";
import PostContents from "./PostContents";
import {VoteInPostType} from "./types/Vote.type";

const PostDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {groupId, postId} = useParams();
    const [postData, setPostData] = useState<PostModel>();

    console.log(postData);
    console.log(location.state);

    const findPost = useCallback(async () => {
        const response = await axios.get(`${HOST}/group/${groupId}/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data;
    }, [groupId, postId]);

    const findPostValidation = useCallback(async () => {
        try {
            setPostData(await findPost());
        } catch (error) {
            await ManageToken.rotateToken();
            setPostData(await findPost());
        }
    }, [findPost])


    useEffect(() => {
        findPostValidation().catch(() => {
            localStorage.clear();
            navigate('/');
        });
    }, [findPostValidation, navigate])
    return (
        <Container>
            {postData &&
                <PostContents key={postData.id} id={postData.id} contents={postData.contents} author={postData.author}
                              title={postData.title} createdAt={postData.createdAt} eventDate={postData.eventDate}
                              location={postData.location} endDate={postData.endDate} memberCount={location.state}/>}
        </Container>
    )
}

export default PostDetail;