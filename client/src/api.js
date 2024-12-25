import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', 
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export const fetchUsers = async (page, limit) => {
    return instance.get('/user/all', {
        params: { page, limit },
        withCredentials: true
    });
};

export const searchUsers = async (query) => {
    return instance.get('/user/search', {
        params: { query },
        withCredentials: true
    });
};

export const createUser = async (email, password, name, surname, patronymic, phone_number, position, roles) => {
    return instance.post('/user/registration', {
        email, password, name, surname, patronymic, phone_number, position, roles
    });
};

export const updateUser = async (id, name, surname, patronymic, email, phone_number, position, roles) => {
    return instance.put(`/user/${id}`, {
        name, surname, patronymic, email, phone_number, position, roles
    });
};

export const fetchSyllabuses = async (page, limit) => {
    return instance.get('/syllabus/all', {
        params: { page, limit }
    });
};

export const fetchAllSyllabuses = async () => {
    return instance.get('/syllabus/all', { params: { limit: 1000 } });
};

export const createSyllabus = async (formData) => {
    return instance.post('/syllabus/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateSyllabus = async (id, formData) => {
    return instance.put(`/syllabus/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteSyllabus = async (id) => {
    return instance.delete(`/syllabus/${id}`);
};

export const searchSyllabuses = async (query) => {
    return instance.get('/syllabus/search', {
        params: { query }
    });
};

export const fetchSyllabusesByYear = async (year, page, limit) => {
    return instance.get('/syllabus/all', {
        params: { year, page, limit }
    });
};

export const downloadSyllabus = async (filename) => {
    return instance.get(`/syllabus/download/${filename}`, {
        responseType: 'blob'
    });
};

export const fetchSubjects = async (page, limit) => {
    return instance.get('/subject/all', {
        params: { page, limit }
    });
};

export const searchSubjects = async (query) => {
    return instance.get('/subject/search', {
        params: { query }
    });
};

export const createSubject = async (name, description, syllabusId) => {
    return instance.post('/subject/create', { name, description, syllabusId });
};

export const updateSubject = async (id, name, description, syllabusId) => {
    return instance.put(`/subject/${id}`, { name, description, syllabusId });
};

export const fetchSpecialities = async () => {
    return instance.get('/speciality/all', { withCredentials: true });
};

export const fetchMethodologicals = async () => {
    return instance.get('/method/all', { withCredentials: true });
};

export const createSpecialityMethodological = async (formData) => {
    return instance.post('/speciality_method/create', formData, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const fetchSpecialityMethodologicals = async () => {
    return instance.get('/speciality_method/all', { withCredentials: true });
};

export const searchSpecialityMethodologicals = async (query) => {
    return instance.get('/speciality_method/search', {
        params: { query },
        withCredentials: true
    });
};

export const fetchMethodsByYear = async (year, page, limit) => {
    return instance.get('/method/all', {
        params: { year, page, limit }
    });
};

export const fetchMethods = async (page, limit) => {
    return instance.get('/method/all', {
        params: { page, limit }
    });
};

export const fetchMethodologicalById = async (id) => {
    return instance.get(`/method/one/${id}`);
};

export const fetchTypeMethods = async () => {
    return instance.get('/type_method/all', { withCredentials: true });
};

export const searchMethods = async (query) => {
    return instance.get('/method/search', {
        params: { query }
    });
};

export const createMethod = async (formData) => {
    return instance.post('/method/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const fetchUserMethodologicals = async () => {
    return instance.get('/user_methodological/all', { withCredentials: true });
};

export const searchUserMethodologicals = async (query) => {
    return instance.get('/user_methodological/search', {
        params: { query },
        withCredentials: true
    });
};

export const createUserMethodological = async (formData) => {
    return instance.post('/user_methodological/create', formData, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const updateMethod = async (id, formData) => {
    return instance.put(`/method/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteMethod = async (id) => {
    return instance.delete(`/method/${id}`);
};

export const downloadMethod = async (filename) => {
    return instance.get(`/method/download/${filename}`, {
        responseType: 'blob'
    });
};
