import { Parent } from "./parent.model";
import { User } from "./user.model";

export class Eleve {
    id!: number;
    img!: any;
    nom!: string;
    prenom!: string;
    sexe!: string;
    dateNais!: Date;
    lieuNais!: string;
    nationalite!: string;
    adresse!: string;
    matricule!: string;
    parentt_id!: number;
    groupe_id!: number;
    ancienGroupe_id!: number;
    user_id!: number;
    usernameel!: string;
    emailel!: string;
    passwordel!: string
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
    usernamep!: string;
    emailp!: string;
    passwordp!: string
    parentt!: Parent
    user!: User

}
