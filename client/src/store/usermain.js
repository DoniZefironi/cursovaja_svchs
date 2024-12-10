import { makeAutoObservable } from "mobx";

export default class UserMain {
    constructor() {
        this._isAuth = JSON.parse(localStorage.getItem('isAuth')) || true;
        this._isAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false; 
        this._user = JSON.parse(localStorage.getItem('user')) || {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
        localStorage.setItem('isAuth', JSON.stringify(bool));
    }

    setIsAdmin(bool) {
        this._isAdmin = bool;
        localStorage.setItem('isAdmin', JSON.stringify(bool));
    }

    setUser(user) {
        this._user = user;
        localStorage.setItem('user', JSON.stringify(user));
    }

    get isAuth() {
        return this._isAuth;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    get user() {
        return this._user;
    }
}
