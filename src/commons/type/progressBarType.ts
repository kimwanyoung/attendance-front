import {VoteStatus} from "../../types/vote-status.enum";

interface ProgressBarType {
    now?: number;
    max?: number;
    label: string;
    voteStatus: VoteStatus;
    name: VoteStatus;
    onClick: () => void;
}

interface ProgressProps {
    width?: number;
}

export type {ProgressBarType, ProgressProps}