import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import userMain from './usermain';

class SyllabusStore {
    syllabuses = [];
    syllabus = null;
    currentPage = 1;
    totalPages = 1;
    searchQuery = '';
    loading = false;
    error = null;

    constructor(userMain) {
        this.userMain = userMain; // Сохраняем экземпляр UserMain
        makeAutoObservable(this);
    }

    setSyllabuses = (syllabuses) => {
        this.syllabuses = syllabuses;
    }

    setSyllabus = (syllabus) => {
        this.syllabus = syllabus;
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
            const response = await axios.get('http://localhost:5000/api/syllabus/all', {
                params: { page, limit: 10 }
            });
            this.setSyllabuses(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch syllabuses');
        } finally {
            this.setLoading(false);
        }
    }

    fetchSyllabusById = async (id) => {
        this.setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/syllabus/one?id=${id}`);
            this.setSyllabus(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch syllabus');
        } finally {
            this.setLoading(false);
        }
    }

    createSyllabus = async (formData) => {
        this.setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/syllabus/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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
            const response = await axios.put(`http://localhost:5000/api/syllabus/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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
            await axios.delete(`http://localhost:5000/api/syllabus/${id}`);
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
            const response = await axios.get('http://localhost:5000/api/syllabus/search', {
                params: { query: this.searchQuery }
            });
            this.setSyllabuses(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to search syllabuses');
        } finally {
            this.setLoading(false);
        }
    }

    // Новый метод для скачивания файла
    downloadSyllabus = async (filename) => {
        this.setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/syllabus/download/${filename}`, {
                responseType: 'blob' // Указываем, что ожидаем бинарные данные
            });

            // Создаем URL для скачивания файла
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Указываем имя файла
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