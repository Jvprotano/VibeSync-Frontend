import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class GuestGuard {
    constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {

            this.router.navigate(['/user-spaces']);

            return false;
        } else {
            return true;
        }
    }
}