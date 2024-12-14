import axios from 'axios';
import { makeAutoObservable } from 'mobx';

class MethodStore {
    methods = [];
    subjects = [];
    typeMethods = [];
    searchQuery = '';
    currentPage = 1;
    totalPages = 1;
    loading = false;
    error = null;

    constructor(userMain) {
        this.userMain = userMain; 
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
        this.setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/method/all', {
                params: { page, limit: 10 }
            });
            this.setMethods(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch methods');
        } finally {
            this.setLoading(false);
        }
    }

    fetchSubjects = async () => {
        this.setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/subject/all', { withCredentials: true });
            this.setSubjects(response.data.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch subjects');
        } finally {
            this.setLoading(false);
        }
    }

    fetchTypeMethods = async () => {
        this.setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/type_method/all', { withCredentials: true });
            this.setTypeMethods(response.data.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch type methods');
        } finally {
            this.setLoading(false);
        }
    }

    searchMethods = async () => {
        if (!this.searchQuery) {
            this.setError('Search query not provided');
            this.setLoading(false);
            return;
        }
        this.setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/method/search', {
                params: { query: this.searchQuery }
            });
            this.setMethods(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to search methods');
        } finally {
            this.setLoading(false);
        }
    }

    createMethod = async (formData) => {
        this.setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/method/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            this.setMethods([...this.methods, response.data]);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to create method');
        } finally {
            this.setLoading(false);
        }
    }

    updateMethod = async (id, formData) => {
        this.setLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/method/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            this.setMethods(this.methods.map(method => (method.id === id ? response.data : method)));
        } catch (error) {
            this.setError(error.response?.data || 'Failed to update method');
        } finally {
            this.setLoading(false);
        }
    }

    deleteMethod = async (id) => {
        this.setLoading(true);
        try {
            await axios.delete(`http://localhost:5000/api/method/${id}`);
            this.setMethods(this.methods.filter(method => method.id !== id));
        } catch (error) {
            this.setError(error.response?.data || 'Failed to delete method');
        } finally {
            this.setLoading(false);
        }
    }

    downloadMethod = async (filename) => {
        this.setLoading(true);
        try {
            if (!filename) {
                throw new Error('Filename is required for download');
            }
            const response = await axios.get(`http://localhost:5000/api/method/download/${filename}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            this.setError(error.response?.data || 'Failed to download method');
        } finally {
            this.setLoading(false);
        }
    }
}

export default MethodStore;
