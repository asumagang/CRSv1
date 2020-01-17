import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    emailAddress:string;
    department:string;
    address:string;
    mobileNo: string;
    role: Role;
    token?: string;
}