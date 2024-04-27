import {Container} from "react-bootstrap";
import GroupCard from "../commons/components/GroupCard";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {ManageToken} from "../utils/manageToken";

export interface GroupProps {
    id: number;
    title: string;
    description: string;
    memberCount: number;
}

const Groups = () => {
    const [groups, setGroups] = useState<GroupProps[]>([]);

    const getGroups = useCallback(async () => {
        const response = await axios.get(`${HOST}/membership`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
        console.log(response.data);
        return response.data;
    }, []);

    const getAllGroupsById = useCallback(async () => {
        try {
            setGroups(await getGroups());
        } catch (err) {
            await ManageToken.rotateToken();
            setGroups(await getGroups());
        }
    }, [getGroups]);

    useEffect(() => {
        getAllGroupsById().catch((error) => {
            console.error(error);
        });
    }, [getAllGroupsById])

    return (
        <Container  className="d-flex flex-column justify-content-start" style={{minHeight: "100vh"}}>
            {groups.map((group) => {
                return <GroupCard id={group.id} key={group.id} title={group.title} description={group.description} memberCount={group.memberCount}/>
            })}
        </Container>
    )
}

export default Groups;