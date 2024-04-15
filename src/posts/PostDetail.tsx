import React, {useCallback, useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useParams} from "react-router-dom";
import {PostModel} from "./types/PostTypes";
import {ManageToken} from "../utils/manageToken";

const PostDetail = () => {
    const {groupId, postId} = useParams();
    const [postData, setPostData] = useState<PostModel>();

    const findPost = useCallback(async () => {
        const response = await axios.get(`${HOST}/groups/${groupId}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data;
    }, [groupId, postId]);

    const findPostValidation = useCallback(async () =>{
        try {
            setPostData(await findPost());
        } catch (error) {
            await ManageToken.rotateToken();
            setPostData(await findPost());
        }
    }, [findPost])

    useEffect(() => {
        findPostValidation();
    }, [])
    return (
        <Container>

        </Container>
    )
}

export default PostDetail;