import { makeAutoObservable } from "mobx";

export default class UserMain {
    constructor() {
        this._isAuth = this.getFromLocalStorage('isAuth', true);
        this._isAdmin = this.getFromLocalStorage('isAdmin', false);
        this._user = this.getFromLocalStorage('user', {});
        makeAutoObservable(this);
        console.log("BO");
    }

    getFromLocalStorage(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            return defaultValue;
        }
    }

    setIsAuth(bool) {
        this._isAuth = bool;
        localStorage.setItem('isAuth', JSON.stringify(bool));
        console.log(this._isAuth);
    }

    setIsAdmin(bool) {
        this._isAdmin = bool;
        localStorage.setItem('isAdmin', JSON.stringify(bool));
        console.log(this._isAdmin);
    }

    setUser(user) {
        this._user = user;
        localStorage.setItem('user', JSON.stringify(user));
        console.log(this._user);
    }

    setToken(token) {
        this._token = token; 
        localStorage.setItem('token', token);
    }

    get token() {
        return this._token || localStorage.getItem('token'); 
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
