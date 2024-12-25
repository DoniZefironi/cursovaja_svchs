import { makeAutoObservable } from "mobx";
import { fetchUsers, searchUsers, createUser, updateUser } from '../api'; 

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
            const response = await fetchUsers(page, this.pageSize);
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
            const response = await searchUsers(this.userSearchQuery);
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
            const response = await createUser(email, password, name, surname, patronymic, phone_number, position, roles);
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
            const response = await updateUser(id, name, surname, patronymic, email, phone_number, position, roles);
            this.setUsers(this.users.map(user => (user.id === id ? response.data : user)));
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    }
}

export default UserStore;
