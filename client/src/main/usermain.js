import {makeAutoObservable} from "mobx";

export default class UserMain {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(bool) {
        this._user = bool
    }

    get isAuth() {
        return this._isAuth
    }
    
    get user() {
        return this._user
    }
}