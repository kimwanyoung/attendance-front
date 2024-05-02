import React, {useCallback, useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {HOST} from "../const/global.const";
import { useNavigate, useParams} from "react-router-dom";
import {PostModel} from "./types/PostTypes";
import {ManageToken} from "../utils/manageToken";
import PostContents from "./PostContents";

const PostDetail = () => {
    const navigate = useNavigate();
    const {groupId, postId} = useParams();
    const [postData, setPostData] = useState<PostModel>({
        id: 0,
        title: "string",
        contents: "string",
        location: "string",
        eventDate: "string",
        voteDuration: 0,
        author: { name: "string" },
        createdAt: "string",
        endDate: "string",
    });

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
        <Container className="min-vh-100">
                <PostContents key={postData.id} id={postData.id} contents={postData.contents} author={postData.author}
                              title={postData.title} createdAt={postData.createdAt} eventDate={postData.eventDate}
                              location={postData.location} endDate={postData.endDate}/>
        </Container>
    )
}

export default PostDetail;