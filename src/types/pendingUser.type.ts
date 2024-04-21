import {UserModel} from "./user.type";

interface PendingUserType {
    id: number;
    status: 'pending' | 'approval' | 'rejected';
    user: UserModel;
}

export type {PendingUserType}