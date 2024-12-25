import { makeAutoObservable } from 'mobx';
import {
    fetchSpecialities, fetchMethodologicals, createSpecialityMethodological,
    fetchSpecialityMethodologicals, searchSpecialityMethodologicals
} from '../api'; // Импортируем функции API

class SpecialityStore {
    specialities = [];
    methodologicals = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSpecialities = (specialities) => {
        this.specialities = specialities;
    }

    setMethodologicals = (methodologicals) => {
        this.methodologicals = methodologicals;
    }

    setLoading = (loading) => {
        this.loading = loading;
    }

    setError = (error) => {
        this.error = error;
    }

    fetchSpecialities = async () => {
        this.setLoading(true);
        try {
            const response = await fetchSpecialities();
            console.log('Fetched Specialities from API:', response.data);
            this.setSpecialities(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch specialities');
            console.log('Error fetching specialities:', error);
        } finally {
            this.setLoading(false);
        }
    }

    fetchMethodologicals = async () => {
        this.setLoading(true);
        try {
            const response = await fetchMethodologicals();
            console.log('Fetched Methodologicals from API:', response.data);
            this.setMethodologicals(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch methodologicals');
            console.log('Error fetching methodologicals:', error);
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
            console.log('Error creating speciality methodological:', error);
        } finally {
            this.setLoading(false);
        }
    }

    fetchSpecialityMethodologicals = async () => {
        this.setLoading(true);
        try {
            const response = await fetchSpecialityMethodologicals();
            console.log('Fetched SpecialityMethodologicals:', response.data);
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
            this.setSpecialities(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to search speciality methodologicals');
        } finally {
            this.setLoading(false);
        }
    }
}

export default SpecialityStore;
