import { Injectable } from "@angular/core";

interface PostLoginAction {
    type: 'buyPlan';
    payload: string;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationStateService {
    private postLoginAction: PostLoginAction | null = null;

    setPostLoginAction(action: PostLoginAction) {
        this.postLoginAction = action;
    }

    getAndClearPostLoginAction(): PostLoginAction | null {
        const action = this.postLoginAction;
        this.postLoginAction = null;
        return action;
    }
}
