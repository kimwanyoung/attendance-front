import {Gender} from "./gender.enum";

interface UserModel {
    userId: number;
    email: string;
    gender: Gender;
    name: string;
    phone: string;
}

interface AvatarType extends UserModel {
    id: number;
    groupId: number;
    onClick: (id: number) => void;
}

export type {UserModel, AvatarType}