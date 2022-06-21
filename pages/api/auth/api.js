import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.API_DOMAIN_URL, //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
    },
});
