import axios from 'axios';
import { makeAutoObservable } from 'mobx';

class SpecialityStore {
    specialities = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSpecialities = (specialities) => {
        this.specialities = specialities;
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
            const response = await axios.get('http://localhost:5000/api/speciality/all', { withCredentials: true });
            console.log('Fetched Specialities from API:', response.data); 
            this.setSpecialities(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to fetch specialities');
            console.log('Error fetching specialities:', error); 
        } finally {
            this.setLoading(false);
        }
    }
        

    createSpecialityMethodological = async (formData) => {
        this.setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/speciality_method/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
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
            const response = await axios.get('http://localhost:5000/api/speciality_method/all', { withCredentials: true });
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
            const response = await axios.get('http://localhost:5000/api/speciality_method/search', {
                params: { query },
                withCredentials: true
            });
            this.setSpecialities(response.data);
        } catch (error) {
            this.setError(error.response?.data || 'Failed to search speciality methodologicals');
        } finally {
            this.setLoading(false);
        }
    }
}

export default SpecialityStore;
