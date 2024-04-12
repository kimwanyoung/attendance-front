import {Container} from "react-bootstrap";
import GroupCard from "../commons/components/GroupCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {HOST} from "../const/global.const";

export interface GroupProps {
    id: number;
    title: string;
    description: string;
    memberCount: number;
}

const Groups = () => {
    const [groups, setGroups] = useState<GroupProps[]>([]);

    useEffect(() => {
        const getAllGroupsById = async () => {
            try {
                const response = await axios.get(`${HOST}/membership`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                })
                console.log(response.data);
                setGroups(response.data);
            } catch (err) {
                console.error(err);
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