import axios from 'axios';
import { makeAutoObservable } from "mobx";

class MethodStore {
    methods = [];
    subjects = [];
    typeMethods = [];
    searchQuery = '';
    currentPage = 1;
    totalPages = 1;
    loading = false;
    pageSize = 10;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setMethods = (methods) => {
        this.methods = methods;
    }

    setSubjects = (subjects) => {
        this.subjects = subjects;
    }

    setTypeMethods = (typeMethods) => {
        this.typeMethods = typeMethods;
    }

    setSearchQuery = (query) => {
        this.searchQuery = query;
    }

    setPage = (page) => {
        this.currentPage = page;
    }

    setTotalPages = (totalPages) => {
        this.totalPages = totalPages;
    }
    setLoading = (loading) => {
        this.loading = loading;
    }
    
    setError = (error) => {
        this.error = error;
    }

    fetchMethods = async (page = 1) => {
        try {
            const response = await axios.get('http://localhost:5000/api/method/all', {
                params: { page, limit: this.pageSize },
                withCredentials: true
            });
            this.setMethods(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            console.error('Failed to fetch methods:', error);
        }
    }

    fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/subject/all', { withCredentials: true });
            this.setSubjects(response.data.data);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        }
    }

    fetchTypeMethods = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/type_method/all', { withCredentials: true });
            this.setTypeMethods(response.data.data);
        } catch (error) {
            console.error('Failed to fetch type methods:', error);
        }
    }

    searchMethods = async () => {
        try {
            console.log("Clearing methods list...");
            this.setMethods([]);
            console.log("Searching methods with query:", this.searchQuery);
            const response = await axios.get(`http://localhost:5000/api/method/search?query=${encodeURIComponent(this.searchQuery)}`);
            console.log("Fetched search results from API:", response.data);
            this.setMethods(response.data);
        } catch (error) {
            console.error('Failed to search methods:', error);
            this.setMethods([]);
        }
    }

    createMethod = async (method) => {
        try {
            const response = await axios.post('http://localhost:5000/api/method/create', method);
            this.setMethods([...this.methods, response.data]);
        } catch (error) {
            console.error('Failed to create method:', error);
        }
    }

    updateMethod = async (id, method) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/method/${id}`, method);
            this.setMethods(this.methods.map(met => (met.id === id ? response.data : met)));
        } catch (error) {
            console.error('Failed to update method:', error);
        }
    }

    deleteMethod = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/method/${id}`);
            this.setMethods(this.methods.filter(met => met.id !== id));
        } catch (error) {
            console.error('Failed to delete method:', error);
        }
    }
}

export default MethodStore;

