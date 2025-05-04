import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    getUser(): Observable<User | null> {
        return this.getAuth<User>(`/user`);
    }
}