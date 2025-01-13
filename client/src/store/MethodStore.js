import { makeAutoObservable } from 'mobx';
import {
    fetchMethodsByYear, fetchMethods, fetchMethodologicalById,
    fetchSubjects, fetchTypeMethods, fetchUsers, searchMethods,
    createMethod, fetchUserMethodologicals, searchUserMethodologicals,
    createUserMethodological, fetchSpecialityMethodologicals, searchSpecialityMethodologicals,
    createSpecialityMethodological, updateMethod, deleteMethod, downloadMethod
} from '../api';

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
            if (response.data && response.data.data) {
                this.setMethods(response.data.data);
                this.setTotalPages(response.data.pages);
                this.setPage(page);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch methods by year');
        } finally {
            this.setLoading(false);
        }
    }

    fetchMethods = async (page = 1) => {
        this.setLoading(true);
        try {
            const response = await fetchMethods(page, 10);
            if (response.data && response.data.data) {
                this.setMethods(response.data.data);
                this.setTotalPages(response.data.pages);
                this.setPage(page);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch methods');
        } finally {
            this.setLoading(false);
        }
    }

    fetchMethodologicalById = async (id) => {
        this.setLoading(true);
        try {
            const response = await fetchMethodologicalById(id);
            if (response.data) {
                return response.data;
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch method by ID');
        } finally {
            this.setLoading(false);
        }
    }

    fetchSubjects = async () => {
        this.setLoading(true);
        try {
            const response = await fetchSubjects();
            if (response.data && response.data.data) {
                this.setSubjects(response.data.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch subjects');
        } finally {
            this.setLoading(false);
        }
    }

    fetchTypeMethods = async () => {
        this.setLoading(true);
        try {
            const response = await fetchTypeMethods();
            if (response.data && response.data.data) {
                this.setTypeMethods(response.data.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch type methods');
        } finally {
            this.setLoading(false);
        }
    }

    fetchUsers = async () => {
        this.setLoading(true);
        try {
            const response = await fetchUsers();
            if (response.data) {
                this.setUsers(response.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch users');
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
            if (response.data) {
                this.setMethods(response.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to search methods');
        } finally {
            this.setLoading(false);
        }
    }

    createMethod = async (formData) => {
        this.setLoading(true);
        try {
            const response = await createMethod(formData);
            if (response.data) {
                this.setMethods([...this.methods, response.data]);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to create method');
        } finally {
            this.setLoading(false);
        }
    }

    fetchUserMethodologicals = async () => {
        this.setLoading(true);
        try {
            const response = await fetchUserMethodologicals();
            if (response.data) {
                return response.data;
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch user methodologicals');
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    searchUserMethodologicals = async (query) => {
        this.setLoading(true);
        try {
            const response = await searchUserMethodologicals(query);
            if (response.data) {
                this.setMethods(response.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to search user methodologicals');
        } finally {
            this.setLoading(false);
        }
    }

    createUserMethodological = async (formData) => {
        this.setLoading(true);
        try {
            const response = await createUserMethodological(formData);
            if (response.data) {
                console.log('UserMethodological created:', response.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to create user methodological');
        } finally {
            this.setLoading(false);
        }
    }

    fetchSpecialityMethodologicals = async () => {
        this.setLoading(true);
        try {
            const response = await fetchSpecialityMethodologicals();
            if (response.data) {
                return response.data;
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to fetch speciality methodologicals');
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    searchSpecialityMethodologicals = async (query) => {
        this.setLoading(true);
        try {
            const response = await searchSpecialityMethodologicals(query);
            if (response.data) {
                this.setMethods(response.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to search speciality methodologicals');
        } finally {
            this.setLoading(false);
        }
    }

    createSpecialityMethodological = async (formData) => {
        this.setLoading(true);
        try {
            const response = await createSpecialityMethodological(formData);
            if (response.data) {
                console.log('SpecialityMethodological created:', response.data);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to create speciality methodological');
        } finally {
            this.setLoading(false);
        }
    }

    updateMethod = async (id, formData) => {
        this.setLoading(true);
        try {
            const response = await updateMethod(id, formData);
            if (response.data) {
                this.setMethods(this.methods.map(method => (method.id === id ? response.data : method)));
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to update method');
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
            this.setError(error.response?.data || error.message || 'Failed to delete method');
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
            if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            this.setError(error.response?.data || error.message || 'Failed to download method');
        } finally {
            this.setLoading(false);
        }
    }
}

export default MethodStore;
