import api from './api';

const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

export default {
    signup,
    login,
    logout,
};
