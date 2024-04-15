import {Card} from "react-bootstrap";
import React from "react";
import {useNavigate} from "react-router-dom";

export interface PostCardProps {
    groupId: number;
    id: number;
    title: string;
    contents: string;
    startData: Date;
    endDate: Date;
    author: { name: string };
}

const PostCard: React.FC<PostCardProps> = ({groupId, id, title, contents, startData, endDate, author}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/groups/${groupId}/posts/${id}`);
    }
    return (
        <Card key={id} className="mt-2" style={{minWidth: "100%"}} border="success" onClick={handleNavigate}>
            {/*<Card.Img variant="top" src="https://placehold.co/100/png" height={100}/>*/}
            <Card.Body style={{fontSize: '80%'}}>
                <Card.Title style={{fontSize: '130%'}}>{title}</Card.Title>
                <Card.Text>
                    {contents}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{fontSize: '70%'}}>생성자: {author.name}</Card.Footer>
        </Card>
    )
}

export default PostCard;