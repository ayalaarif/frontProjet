import { User } from "./user.model";

export class Parent {
    id!: number;
    nomComplet_pere!: string;
    nomComplet_mere!: string;
    cin_pere!: string;
    cin_mere!: string;
    tel_pere!: string;
    tel_mere!: string;
    fct_pere!: string;
    fct_mere!: string;
    email_pere!: string;
    email_mere!: string;
    user_id!: number;
    user!: User;
}
