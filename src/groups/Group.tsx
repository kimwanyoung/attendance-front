import {Container} from "react-bootstrap";
import GroupCard from "../commons/components/GroupCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";
import {retryRequest, rotateAccessToken} from "../utils/manageToken";

export interface GroupProps {
    id: number;
    title: string;
    description: string;
    memberCount: number;
}

const Groups = () => {
    const [groups, setGroups] = useState<GroupProps[]>([]);

    const getGroups = async () => {
        const response = await axios.get(`${HOST}/membership`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
        return response.data;
    }

    useEffect(() => {
        const getAllGroupsById = async () => {
            try {
                const groups = await getGroups();
                setGroups(groups);
            } catch (err) {
                await retryRequest(err, getGroups);
                window.location.reload();
            }
        }
        getAllGroupsById();
    }, [])

    return (
        <Container  className="d-flex flex-column justify-content-start" style={{minHeight: "100vh"}}>
            {groups.map((group) => {
                return <GroupCard id={group.id} key={group.id} title={group.title} description={group.description} memberCount={group.memberCount}/>
            })}
        </Container>
    )
}

export default Groups;