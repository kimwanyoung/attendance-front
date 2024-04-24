import {Card} from "react-bootstrap";
import React from "react";
import {useNavigate} from "react-router-dom";

export interface PostCardProps {
    groupId: number;
    id: number;
    title: string;
    contents: string;
    createdAt: Date;
    endDate: Date;
    timeDifference: string;
    author: { name: string };
}

const PostCard: React.FC<PostCardProps> = (
    {
        groupId,
        id,
        title,
        contents,
        createdAt,
        endDate,
        author,
        timeDifference
    }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/groups/${groupId}/posts/${id}`);
    }
    return (
        <Card key={id} className="mt-2" style={{minWidth: "100%"}} border="success" onClick={handleNavigate}>
            <Card.Body style={{fontSize: '80%'}}>
                <Card.Title style={{fontSize: '130%'}}>[일정 제목] {title}</Card.Title>
                <Card.Text>
                    일정 내용: {contents}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between align-items-center"
                         style={{fontSize: '70%'}}>
                <p className="m-0">생성자: {author.name}</p>
                <p className="m-0">생성일: {timeDifference}</p>
            </Card.Footer>
        </Card>
    )
}

export default PostCard;