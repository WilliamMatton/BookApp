import { Routes } from "@angular/router";
import { SignUp } from "./sign-up/sign-up";
import { Login } from "./login/login";

export const authRoutes: Routes = [
    { path: 'signup', component: SignUp, title: 'Sign Up', },
    { path: 'login', component: Login, title: 'Sign In', },
]