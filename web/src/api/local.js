import axios from 'axios'

export const localApi = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 1000,
});

export var socket = new WebSocket('ws://localhost:8081');

socket.addEventListener('error', (event) => {
    console.error(event);
});