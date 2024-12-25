import { makeAutoObservable } from 'mobx';
import {
    fetchSyllabuses, fetchAllSyllabuses, createSyllabus,
    updateSyllabus, deleteSyllabus, searchSyllabuses,
    fetchSyllabusesByYear, downloadSyllabus
} from '../api'; 

class SyllabusStore {
    syllabuses = [];
    currentPage = 1;
    totalPages = 1;
    searchQuery = '';
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSyllabuses = (syllabuses) => {
        this.syllabuses = syllabuses;
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

    setSearchQuery = (query) => {
        this.searchQuery = query;
    }

    fetchSyllabuses = async (page = 1) => {
        this.setLoading(true);
        try {
            const response = await fetchSyllabuses(page, 10);
            this.setSyllabuses(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch syllabuses');
        } finally {
            this.setLoading(false);
        }
    }

    fetchAllSyllabuses = async () => {
        this.setLoading(true);
        try {
            const response = await fetchAllSyllabuses();
            this.setSyllabuses(response.data.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch all syllabuses');
        } finally {
            this.setLoading(false);
        }
    }

    createSyllabus = async (formData) => {
        this.setLoading(true);
        try {
            const response = await createSyllabus(formData);
            this.setSyllabuses([...this.syllabuses, response.data]);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to create syllabus');
        } finally {
            this.setLoading(false);
        }
    }

    updateSyllabus = async (id, formData) => {
        this.setLoading(true);
        try {
            const response = await updateSyllabus(id, formData);
            this.setSyllabuses(this.syllabuses.map(syllabus => (syllabus.id === id ? response.data : syllabus)));
        } catch (error) {
            this.setError(error.response?.data || 'Failed to update syllabus');
        } finally {
            this.setLoading(false);
        }
    }

    deleteSyllabus = async (id) => {
        this.setLoading(true);
        try {
            await deleteSyllabus(id);
            this.setSyllabuses(this.syllabuses.filter(syllabus => syllabus.id !== id));
        } catch (error) {
            this.setError(error.response?.data || 'Failed to delete syllabus');
        } finally {
            this.setLoading(false);
        }
    }

    searchSyllabuses = async () => {
        if (!this.searchQuery) {
            this.setError('Search query not provided');
            this.setLoading(false); 
            return;
        }
        this.setLoading(true);
        try {
            const response = await searchSyllabuses(this.searchQuery);
            this.setSyllabuses(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to search syllabuses');
        } finally {
            this.setLoading(false);
        }
    }

    fetchSyllabusesByYear = async (year, page = 1) => {
        this.setLoading(true);
        try {
            const response = await fetchSyllabusesByYear(year, page, 10);
            this.setSyllabuses(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch syllabuses');
        } finally {
            this.setLoading(false);
        }
    }

    downloadSyllabus = async (filename) => {
        this.setLoading(true);
        try {
            const response = await downloadSyllabus(filename);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            this.setError(error.response?.data || 'Failed to download syllabus');
        } finally {
            this.setLoading(false);
        }
    }
}

export default SyllabusStore;
