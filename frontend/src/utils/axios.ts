import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000',
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 404) {
                console.error("Not Found!");
            } else if (status >= 500) {
                console.error("Server Internal Error");
            } else {
                console.error(`خطای نامشخص با کد ${status}:`, data);
            }
        } else if (error.request) {
            console.error('Network Error!!');
        } else {
            console.error("Send Request Error", error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;