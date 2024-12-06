import axios from 'axios';
import { makeAutoObservable } from "mobx";

class SubjectStore {
    subjects = [];
    searchQuery = '';

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
    
}

export default SubjectStore;