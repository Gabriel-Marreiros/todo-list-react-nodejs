import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;

const axiosClient = axios.create({
    baseURL: apiUrl,
})

axiosClient.interceptors.request.use((config) => {
    const accessToken: string | null = localStorage.getItem(accessTokenName);

    if (accessToken) {
        config.headers.Authorization = accessToken;
        return config;
    }

    return config;
});

export { axiosClient };