import {Gender} from "./gender.enum";

interface UserModel {
    email: string;
    gender: Gender;
    name: string;
    phone: string;
}

export type {UserModel}