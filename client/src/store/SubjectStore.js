import axios from 'axios';
import { makeAutoObservable } from "mobx";

class SubjectStore {
    subjects = [];
    users = []; // Добавляем массив для пользователей
    searchQuery = '';
    userSearchQuery = ''; // Добавляем переменную для запроса пользователей

    constructor() {
        makeAutoObservable(this);
    }

    setSubjects = (subjects) => {
        this.subjects = subjects;
        console.log("Subjects set in MobX store:", this.subjects);
    }

    setUsers = (users) => {
        this.users = users;
        console.log("Users set in MobX store:", this.users);
    }

    setSearchQuery = (query) => {
        this.searchQuery = query;
        console.log("Search query set in MobX store:", this.searchQuery);
    }

    setUserSearchQuery = (query) => {
        this.userSearchQuery = query;
        console.log("User search query set in MobX store:", this.userSearchQuery);
    }

    fetchSubjects = async () => {
        try {
            console.log("Fetching subjects from API...");
            const response = await axios.get('http://localhost:5000/api/subject/all');
            console.log("Fetched subjects from API:", response.data.data);
            this.setSubjects(response.data.data);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        }
    }

    fetchUsers = async () => {
        try {
            console.log("Fetching users from API...");
            const response = await axios.get('http://localhost:5000/api/user/all');
            console.log("Fetched users from API:", response.data.data);
            this.setUsers(response.data.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }

    searchSubjects = async () => {
        try {
            console.log("Clearing subjects list...");
            this.setSubjects([]); 
            console.log("Searching subjects with query:", this.searchQuery);
            const response = await axios.get(`http://localhost:5000/api/subject/search?query=${encodeURIComponent(this.searchQuery)}`);
            console.log("Fetched search results from API:", response.data);
            this.setSubjects(response.data);
        } catch (error) {
            console.error('Failed to search subjects:', error);
            this.setSubjects([]); 
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
            this.setUsers([]);
        }
    }
    
    
}

export default SubjectStore;
