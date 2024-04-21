import {Container} from "react-bootstrap";
import React from "react";
import {AvatarType} from "../types/user.type";
import {ApprovalEnum} from "../types/approval.enum";
import axios from "axios";
import {HOST} from "../const/global.const";

const Avatar: React.FC<AvatarType> = ({id, userId, groupId, name, gender, email, phone, onClick}) => {
    const handleClickButton = async (type: ApprovalEnum) => {
        const response = await axios.post(`${HOST}/membership/approval`, {
            userId,
            groupId,
            status: type,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        onClick(id);
        return response.data;
    }

    return (
        <Container>
            <div className="container py-2">
                <div className="row  d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card border-success">
                            <div className="card-body d-flex align-items-center justify-content-between text-center">
                                <img src="https://via.placeholder.com/150" alt="Profile"
                                     className="rounded-circle" width="80" height="80"/>
                                <div className="mt-3 d-flex flex-column align-items-baseline">
                                    <h4>{name}</h4>
                                    <p className="text-secondary mb-1">{email}</p>
                                    <p className="text-muted font-size-sm">{phone}</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <button className="btn btn-outline-success m-1" onClick={() => handleClickButton(ApprovalEnum.APPROVED)}>승인</button>
                                    <button className="btn btn-outline-danger m-1" onClick={() => handleClickButton(ApprovalEnum.REJECTED)}>거절</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Avatar;