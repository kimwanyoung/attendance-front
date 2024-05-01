import {Gender} from "./gender.enum";

interface UserModel {
    id: number;
    email: string;
    gender: Gender;
    name: string;
    phone: string;
}

interface AvatarType extends UserModel {
    id: number;
    userId:number;
    groupId: number;
    onClick: (id: number) => void;
}

export type {UserModel, AvatarType}