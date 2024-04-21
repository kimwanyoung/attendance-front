import {UserModel} from "./user.type";

interface PendingUserType {
    status: 'pending' | 'approval' | 'rejected';
    user: UserModel;
}

export type {PendingUserType}