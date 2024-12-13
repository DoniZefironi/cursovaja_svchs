import axios from 'axios';
import { makeAutoObservable } from "mobx";

class SubjectStore {
    subjects = [];
    searchQuery = '';
    currentPage = 1;
    totalPages = 1;
    pageSize = 10;

    constructor() {
        makeAutoObservable(this);
    }

    setSubjects = (subjects) => {
        this.subjects = subjects;
        console.log("Subjects set in MobX store:", this.subjects);
    }

    setSearchQuery = (query) => {
        this.searchQuery = query;
        console.log("Search query set in MobX store:", this.searchQuery);
    }

    setPage = (page) => {
        this.currentPage = page;
        console.log("Current page set in MobX store:", this.currentPage);
    }

    setTotalPages = (totalPages) => {
        this.totalPages = totalPages;
        console.log("Total pages set in MobX store:", this.totalPages);
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

    createSubject = async (name, description) => {
        try {
            const response = await axios.post('http://localhost:5000/api/subject/create', { name, description });
            this.setSubjects([...this.subjects, response.data]);
        } catch (error) {
            console.error('Failed to create subject:', error);
        }
    }

    updateSubject = async (id, name, description) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/subject/${id}`, { name, description });
            this.setSubjects(this.subjects.map(sub => (sub.id === id ? response.data : sub)));
        } catch (error) {
            console.error('Failed to update subject:', error);
        }
    }
}

export default SubjectStore;
