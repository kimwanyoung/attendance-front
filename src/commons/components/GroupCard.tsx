import {Card} from "react-bootstrap";
import {GroupProps} from "../../groups/Group";
import React from "react";
import {useNavigate} from "react-router-dom";

const GroupCard: React.FC<GroupProps> = ({id, title, description, memberCount}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/groups/${id}`, {
            state: memberCount,
        });
    }

    return (
        <Card className="mt-2" style={{minWidth: "100%"}} border="success" onClick={handleCardClick}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                    <Card.Text className="text-muted m-0">
                        {description}
                    </Card.Text>
                    <Card.Title className="m-0  fs-6">{title}</Card.Title>
                </div>
                <Card.Text className="text-success">{memberCount}명</Card.Text>
            </Card.Body>

        </Card>
    )
}

export default GroupCard;