import {UserModel} from "../../types/user.type";

interface GroupListType {
    id: number;
    title: string;
    description: string;
    creator: UserModel;
}

export type {GroupListType};