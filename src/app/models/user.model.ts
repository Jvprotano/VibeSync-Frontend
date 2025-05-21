import { Plan } from "./plan.model";

export interface User {
    name: string;
    email: string;
    plan: Plan;
}