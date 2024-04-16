import React from "react";
import {DetailPostProps, PostModel} from "./types/PostTypes";
import {getRemainingDays} from "../utils/convertDate";
import {Map} from 'react-kakao-maps-sdk';
import KakaoMap from "../commons/components/KakaoMap";

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
                            <div className="text-muted fst-italic mt-1">투표 마감까지 남은일 : {getRemainingDays(endDate)}일
                            </div>
                        </header>
                        <figure className="mb-4">
                            <KakaoMap location={location} />
                        </figure>
                        <section className="mb-5">
                            <p className="fs-5 mb-4">{contents}</p>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default PostContents;