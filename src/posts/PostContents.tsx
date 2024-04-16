import React, {useState} from "react";
import {DetailPostProps} from "./types/PostTypes";
import {getRemainingDays} from "../utils/convertDate";
import KakaoMap from "../commons/components/KakaoMap";
import {Button, Card} from "react-bootstrap";
import CustomProgressBar from "../commons/components/CustomProgressBar";
import {VoteStatus} from "../types/vote-status.enum";
import {useParams} from "react-router-dom";
import axios from "axios";
import {HOST} from "../const/global.const";
import {ManageToken} from "../utils/manageToken";

const PostContents: React.FC<DetailPostProps> = (
    {
        contents,
        title,
        author,
        eventDate,
        location,
        createdAt,
        endDate,
    }
) => {
    const {groupId, postId} = useParams();
    const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.NOT_VOTED_YET);

    const handleVoteStatus = (voteType: VoteStatus) => {
        setVoteStatus(voteType);
    }

    const requestVote = async () => {
        const response = await axios.post(`${HOST}/vote/group/${groupId}/post/${postId}`, {
            voteStatus,
        }, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data;
    }

    const handleSubmitVoteStatus = async () => {
        try {
            await requestVote();
        } catch (err) {
            await ManageToken.rotateToken();
            await requestVote();
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8">
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{title}</h1>
                            <div className="text-muted fst-italic mt-1">생성일 : {createdAt.split('T')[0]}
                            </div>
                            <div className="text-muted fst-italic mt-1">생성자 : {author.name}
                            </div>
                            <div className="text-muted fst-italic mt-1">약속 날짜 : {eventDate.split('T')[0]}
                            </div>
                        </header>
                        <figure className="mb-1">
                            <KakaoMap location={location}/>
                        </figure>
                        <section className="mb-1">
                            <p className="mb-4 text-muted">{location}</p>
                            <p className="fs-5 mb-4">{contents}</p>
                        </section>
                        <section className="mb-5">
                            <Card className="mt-2">
                                <Card.Body>
                                    <CustomProgressBar max={20} now={8} label="참석" name={VoteStatus.PARTICIPATED} onClick={() => handleVoteStatus(VoteStatus.PARTICIPATED)} voteStatus={voteStatus}/>
                                    <CustomProgressBar max={20} now={3} label="불참" name={VoteStatus.NOT_PARTICIPATED} onClick={() => handleVoteStatus(VoteStatus.NOT_PARTICIPATED)} voteStatus={voteStatus}/>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="text-muted m-0">투표 마감 : {getRemainingDays(endDate)}일 남음</p>
                                        <Button variant="success" size="sm" onClick={handleSubmitVoteStatus}>제출</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default PostContents;