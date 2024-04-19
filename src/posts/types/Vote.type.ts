import {VoteStatus} from "../../types/vote-status.enum";

interface VoteInPostType {
    currentUserStatus: VoteStatus,
    allVotes: any[],
}

export type {VoteInPostType};