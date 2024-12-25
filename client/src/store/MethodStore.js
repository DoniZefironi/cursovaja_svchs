import { makeAutoObservable } from 'mobx';
import {
    fetchMethodsByYear, fetchMethods, fetchMethodologicalById,
    fetchSubjects, fetchTypeMethods, fetchUsers, searchMethods,
    createMethod, fetchUserMethodologicals, searchUserMethodologicals,
    createUserMethodological, fetchSpecialityMethodologicals, searchSpecialityMethodologicals,
    createSpecialityMethodological, updateMethod, deleteMethod, downloadMethod
} from '../api'; // Импортируем функции API

class MethodStore {
    methods = [];
    subjects = [];
    typeMethods = [];
    users = [];
    specialities = [];
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

    setUsers = (users) => {
        this.users = users;
    }

    setSpecialities = (specialities) => {
        this.specialities = specialities;
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

    fetchMethodsByYear = async (year, page = 1) => {
        this.setLoading(true);
        try {
            const response = await fetchMethodsByYear(year, page, 10);
            this.setMethods(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch methods');
        } finally {
            this.setLoading(false);
        }
    }

    fetchMethods = async (page = 1) => {
        this.setLoading(true);
        try {
            const response = await fetchMethods(page, 10);
            this.setMethods(response.data.data);
            this.setTotalPages(response.data.pages);
            this.setPage(page);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch methods');
        } finally {
            this.setLoading(false);
        }
    }

    fetchMethodologicalById = async (id) => {
        this.setLoading(true);
        try {
            const response = await fetchMethodologicalById(id);
            return response.data;
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch method by ID');
        } finally {
            this.setLoading(false);
        }
    }

    fetchSubjects = async () => {
        this.setLoading(true);
        try {
            const response = await fetchSubjects();
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
            const response = await fetchTypeMethods();
            this.setTypeMethods(response.data.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch type methods');
        } finally {
            this.setLoading(false);
        }
    }

    fetchUsers = async () => {
        this.setLoading(true);
        try {
            const response = await fetchUsers();
            this.setUsers(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch users');
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
            const response = await searchMethods(this.searchQuery);
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
            const response = await createMethod(formData);
            this.setMethods([...this.methods, response.data]);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to create method');
        } finally {
            this.setLoading(false);
        }
    }    

    fetchUserMethodologicals = async () => {
        this.setLoading(true);
        try {
            const response = await fetchUserMethodologicals();
            return response.data;
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch user methodologicals');
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    searchUserMethodologicals = async (query) => {
        this.setLoading(true);
        try {
            const response = await searchUserMethodologicals(query);
            this.setMethods(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to search user methodologicals');
        } finally {
            this.setLoading(false);
        }
    }

    createUserMethodological = async (formData) => {
        this.setLoading(true);
        try {
            const response = await createUserMethodological(formData);
            console.log('UserMethodological created:', response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to create user methodological');
        } finally {
            this.setLoading(false);
        }
    }

    fetchSpecialityMethodologicals = async () => {
        this.setLoading(true);
        try {
            const response = await fetchSpecialityMethodologicals();
            return response.data;
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch speciality methodologicals');
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    searchSpecialityMethodologicals = async (query) => {
        this.setLoading(true);
        try {
            const response = await searchSpecialityMethodologicals(query);
            this.setMethods(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to search speciality methodologicals');
        } finally {
            this.setLoading(false);
        }
    }

    createSpecialityMethodological = async (formData) => {
        this.setLoading(true);
        try {
            const response = await createSpecialityMethodological(formData);
            console.log('SpecialityMethodological created:', response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to create speciality methodological');
        } finally {
            this.setLoading(false);
        }
    }

    updateMethod = async (id, formData) => {
        this.setLoading(true);
        try {
            const response = await updateMethod(id, formData);
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
            await deleteMethod(id);
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
            const response = await downloadMethod(filename);
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
