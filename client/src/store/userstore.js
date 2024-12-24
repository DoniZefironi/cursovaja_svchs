// store/UserStore.js
import axios from 'axios';
import { makeAutoObservable } from "mobx";

class UserStore {
    users = [];
    userSearchQuery = '';
    currentPage = 1;
    totalPages = 1;
    pageSize = 10;

    constructor() {
        makeAutoObservable(this);
    }

    setUsers = (users) => {
        this.users = users;
        console.log("Users set in MobX store:", this.users);
    }

    setUserSearchQuery = (query) => {
        this.userSearchQuery = query;
        console.log("User search query set in MobX store:", this.userSearchQuery);
    }

    setPage = (page) => {
        this.currentPage = page;
        console.log("Current page set in MobX store:", this.currentPage);
    }

    setTotalPages = (totalPages) => {
        this.totalPages = totalPages;
        console.log("Total pages set in MobX store:", this.totalPages);
    }

    fetchUsers = async (page = 1) => {
        try {
            console.log(`Fetching users from API for page ${page}...`);
            const response = await axios.get('http://localhost:5000/api/user/all', {
                params: { page, limit: this.pageSize },
                withCredentials: true
            });
            console.log("Fetched users from API:", response.data.data);
            this.setUsers(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }

    searchUsers = async () => {
        try {
            console.log("Searching users with query:", this.userSearchQuery);
            const response = await axios.get('http://localhost:5000/api/user/search', {
                params: { query: this.userSearchQuery },
                withCredentials: true
            });
            console.log("Fetched user search results from API:", response.data);
            this.setUsers(response.data);
        } catch (error) {
            console.error('Failed to search users:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
            this.setUsers([]);
        }
    }

    createUser = async (email, password, name, surname, patronymic, phone_number, position, roles) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/registration', {
                email, password, name, surname, patronymic, phone_number, position, roles
            });
            this.setUsers([...this.users, response.data]);
        } catch (error) {
            console.error('Failed to create user:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
        }
    }

    updateUser = async (id, name, surname, patronymic, email, phone_number, position, roles) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/user/${id}`, {
                name, surname, patronymic, email, phone_number, position, roles
            });
            this.setUsers(this.users.map(user => (user.id === id ? response.data : user)));
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    }
}

export default UserStore;
