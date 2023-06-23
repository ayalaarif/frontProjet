import { User } from "../user.model";

export class LoginResponseVm {
    user!: User;
    token!: string;
}
