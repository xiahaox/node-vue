import axios from 'axios'
import Vue from 'vue'
import router from './router'
export const AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? '/admin/api/' : 'http://localhost:3000/admin/api/',
});
console.log(process.env);

// 拦截器

AxiosInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (localStorage.token) {
        config.headers.Authorization = `Bearer ${localStorage.token}`
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
AxiosInstance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response);
    const { code, msg } = response.data
    if (code == 0) {
        Vue.prototype.$message({
            type: "error",
            message: msg
        })

    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    Vue.prototype.$message({
        type: error,
        message: error.response.status == 500 ? '响应失败' : error.response.data.message
    })
    router.push('/login')

    return Promise.reject(error);
});