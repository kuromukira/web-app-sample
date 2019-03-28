import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {

    $_state: Observable<T>;
    private _$_state: BehaviorSubject<T>;

    protected constructor(initialState: T) {
        this._$_state = new BehaviorSubject(initialState);
        this.$_state = this._$_state.asObservable();
    }

    get state(): T {
        return this._$_state.getValue();
    }

    setState(nextState: T) {
        this._$_state.next(nextState);
    }

}
