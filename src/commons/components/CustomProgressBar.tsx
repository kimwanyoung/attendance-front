import React from "react";
import {ProgressBarType, ProgressProps} from "../type/progressBarType";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const CustomProgressBar:React.FC<ProgressBarType> = ({now, max, label, voteStatus, onClick, name}) => {
    return (
        <ProgressBarContainer className="mb-3" id={name} $voteStatus={name === voteStatus} onClick={onClick}>
            <div className="d-flex align-items-center">
                <FaCheckCircle className="m-2" size={15} color="#198754"/>
                <ProgressBarLabel>{label}</ProgressBarLabel>
            </div>
            <Progress width={(now/max)*100} />
            <PersonCount>{now}</PersonCount>
        </ProgressBarContainer>
    )
}

export default CustomProgressBar;

const ProgressBarContainer = styled.div<{$voteStatus: boolean}>`
    position: relative;
    display: flex;
    align-items: center;
    height: 2rem;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${(props) => props.$voteStatus ? '#198754' : 'lightgray'};
`

const ProgressBarLabel = styled.label`
    font-size: small;
    font-weight: bold;
`

const Progress = styled.div<ProgressProps>`
    position: absolute;
    width: ${(props) => props.width}%;
    height: 100%;
    background-color: #198754;
    border-radius: 8px;
    opacity: 0.2;
`

const PersonCount = styled.p`
    position: absolute;
    right: 1rem;
    margin: 0;
    font-size: 12px;
    font-weight: bold;
    color:#198754;
`
