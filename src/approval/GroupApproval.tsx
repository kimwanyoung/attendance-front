import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useParams} from "react-router-dom";
import {ManageToken} from "../utils/manageToken";
import {PendingUserType} from "../types/pendingUser.type";
import Avatar from "./Avatar";
import {Container} from "react-bootstrap";

const GroupApproval = () => {
    const params = useParams();
    const [pendingUsers, setPendingUsers] = useState<PendingUserType[]>();
    const getPendingUserList = useCallback(async () => {
        const response = await axios.get<PendingUserType[]>(`${HOST}/membership/pendingList/${params.groupId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }, [params.groupId])

    const validateGetPendingList = useCallback(async () => {
        try {
            setPendingUsers(await getPendingUserList());
        } catch (error) {
            await ManageToken.rotateToken();
            setPendingUsers(await getPendingUserList());
        }
    }, [getPendingUserList])

    useEffect(() => {
        validateGetPendingList().catch((error) => {
            console.error('에러 발생 : ', error);
        });
    }, [validateGetPendingList]);
    return (
        <Container>
            {pendingUsers?.map((pendingUser) => <Avatar key={pendingUser.user.phone} name={pendingUser.user.name} email={pendingUser.user.email} gender={pendingUser.user.gender} phone={pendingUser.user.phone}/>)}
        </Container>
    );
}

export default GroupApproval;