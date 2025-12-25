import api from './api';

const getMessDetails = async () => {
    const response = await api.get('/mess/details');
    return response.data;
};

const createOrUpdateMess = async (messData) => {
    const response = await api.post('/mess/create', messData);
    return response.data;
};

const getStats = async () => {
    const response = await api.get('/stats');
    return response.data;
};

const addLog = async (logData) => {
    const response = await api.post('/logs/add', logData);
    return response.data;
};

const getMonthlyLogs = async (year, month) => {
    const response = await api.get(`/logs/month/${year}/${month}`);
    return response.data;
};

const downloadLogsCsv = async (year, month) => {
    const response = await api.get(`/export/csv/${year}/${month}`, {
        responseType: 'blob', // Important for file handling
    });
    return response.data;
};

export default {
    getMessDetails,
    createOrUpdateMess,
    getStats,
    addLog,
    getMonthlyLogs,
    downloadLogsCsv,
};
