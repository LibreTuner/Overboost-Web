import axios from 'axios'

export const localApi = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    timeout: 1000,
});