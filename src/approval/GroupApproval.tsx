import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {useNavigate, useParams} from "react-router-dom";
import {ManageToken} from "../utils/manageToken";
import {PendingUserType} from "../types/pendingUser.type";
import Avatar from "./Avatar";
import {Container} from "react-bootstrap";
import CommonModal from "../commons/components/CommonModal";

const GroupApproval = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [unAuthorizationModal, setUnAuthorizationModal] = useState(false);
    const [pendingUsers, setPendingUsers] = useState<PendingUserType[]>();

    const removePendingUserById = (id: number) => {
        const removedList = pendingUsers?.filter((pendingUsers) => pendingUsers.id !== id);
        setPendingUsers(removedList);
    }

    console.log(pendingUsers);

    const getPendingUserList = useCallback(async () => {
        const response = await axios.get<PendingUserType[]>(`${HOST}/group/${params.groupId}/membership/pending-list`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }, [params.groupId])

    const validateGetPendingList = useCallback(async () => {
        try {
            setPendingUsers(await getPendingUserList());
        } catch (error: any) {
            if (error.response.status === 401 && error.response.data.message.includes("권한")) {
                setUnAuthorizationModal(true);
            }
            if (error.response.status === 401 && error.response.data.message.includes("토큰")) {
                await ManageToken.rotateToken();
                setPendingUsers(await getPendingUserList());
            }
        }
    }, [getPendingUserList])

    useEffect(() => {
        validateGetPendingList().catch((error) => {
            console.error('에러 발생 : ', error);
        });
    }, [validateGetPendingList]);

    const unAuthorizationModalProps = {
        onHide: () => {
            setUnAuthorizationModal(prevState => !prevState);
            navigate(-1);
        },
        show: unAuthorizationModal,
    }
    return (
        <>
            <Container className="min-vh-100">
                {pendingUsers?.map((pendingUser) =>
                    <Avatar
                        key={pendingUser.user.phone}
                        id={pendingUser.id}
                        groupId={Number(params.groupId)}
                        userId={pendingUser.user.id}
                        name={pendingUser.user.name}
                        email={pendingUser.user.email}
                        gender={pendingUser.user.gender}
                        phone={pendingUser.user.phone}
                        onClick={removePendingUserById}
                    />
                )
                }
            </Container>
            <CommonModal props={unAuthorizationModalProps} title="권한 에러" body="가입승인 권한이 없습니다."/>
        </>
    );
}

export default GroupApproval;