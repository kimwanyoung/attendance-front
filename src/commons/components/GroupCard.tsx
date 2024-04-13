import {Card} from "react-bootstrap";
import {GroupProps} from "../../groups/Group";
import React from "react";

const GroupCard:React.FC<GroupProps> = ({id, title, description, memberCount}) => {
    return (
        <Card className="mt-2" style={{minWidth: "100%"}} border="success">
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body style={{fontSize:'80%'}}>
                <Card.Title style={{fontSize:'130%'}}>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{fontSize:'70%'}}>참가자: {memberCount}명</Card.Footer>
        </Card>
    )
}

export default GroupCard;