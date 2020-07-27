import axios from 'axios'

export const remoteApi = axios.create({
    baseURL: 'http://localhost:8088/api/v1/',
    timeout: 1000,
});

export const upload = async (file, onUploadProgress) => {
    var formData = new FormData();
    formData.append("file", file);

    const config = {
        onUploadProgress,
        timeout: 0,
    };

    const response = await remoteApi.post('upload', formData, config);
    console.log(response);
}