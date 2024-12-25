import axios from 'axios';
import { makeAutoObservable } from "mobx";

class SubjectStore {
    subjects = [];
    syllabuses = [];
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

    setSyllabuses = (syllabuses) => {
        this.syllabuses = syllabuses;
        console.log("Syllabuses set in MobX store:", this.syllabuses);
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

    fetchSubjects = async (page = 1) => {
        try {
            console.log("Fetching subjects from API...");
            const response = await axios.get('http://localhost:5000/api/subject/all', {
                params: { page, limit: this.pageSize }
            });
            console.log("Fetched subjects from API:", response.data.data);
            this.setSubjects(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        }
    }

    fetchAllSyllabuses = async () => {
        try {
            console.log("Fetching all syllabuses from API...");
            const response = await axios.get('http://localhost:5000/api/syllabus/all', { params: { limit: 1000 } }); // Увеличиваем лимит для получения всех силлабусов
            console.log("Fetched all syllabuses from API:", response.data.data);
            this.setSyllabuses(response.data.data);
        } catch (error) {
            console.error('Failed to fetch syllabuses:', error);
        }
    }

    searchSubjects = async () => {
        try {
            console.log("Clearing subjects list...");
            this.setSubjects([]);
            console.log("Searching subjects with query:", this.searchQuery);
            const response = await axios.get(`http://localhost:5000/api/subject/search`, {
                params: { query: this.searchQuery }
            });
            console.log("Fetched search results from API:", response.data);
            this.setSubjects(response.data);
        } catch (error) {
            console.error('Failed to search subjects:', error);
            this.setSubjects([]);
        }
    }

    createSubject = async (name, description, syllabusId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/subject/create', { name, description, syllabusId });
            this.setSubjects([...this.subjects, response.data]);
        } catch (error) {
            console.error('Failed to create subject:', error);
        }
    }

    updateSubject = async (id, name, description, syllabusId) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/subject/${id}`, { name, description, syllabusId });
            this.setSubjects(this.subjects.map(sub => (sub.id === id ? response.data : sub)));
        } catch (error) {
            console.error('Failed to update subject:', error);
        }
    }
}

export default SubjectStore;
