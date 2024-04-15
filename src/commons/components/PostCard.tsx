import {Card} from "react-bootstrap";
import React from "react";

export interface PostCardProps {
    id: number;
    title: string;
    contents: string;
    startData: Date;
    endDate: Date;
    author: { email: string };
}

const PostCard:React.FC<PostCardProps> = ({id, title, contents, startData, endDate, author}) => {
    return (
        <Card key={id} className="mt-2" style={{minWidth: "100%"}} border="success">
            {/*<Card.Img variant="top" src="https://placehold.co/100/png" height={100}/>*/}
            <Card.Body style={{fontSize:'80%'}}>
                <Card.Title style={{fontSize:'130%'}}>{title}</Card.Title>
                <Card.Text>
                    {contents}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{fontSize:'70%'}}>생성자: {author.email}</Card.Footer>
        </Card>
    )
}

export default PostCard;