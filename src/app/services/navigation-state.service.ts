import { Injectable } from "@angular/core";

interface PostExecuteAction {
    type: 'buyPlan' | 'createSpace';
    payload: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationStateService {

    private postLoginAction: PostExecuteAction | null = null;

    setPostLoginAction(action: PostExecuteAction) {
        this.postLoginAction = action;
    }

    getAndClearPostLoginAction(): PostExecuteAction | null {
        const action = this.postLoginAction;
        this.postLoginAction = null;
        return action;
    }
}
