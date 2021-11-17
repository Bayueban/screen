import axios from "axios";
// import qs from "qs";
import { Message } from "element-ui";

// import { requestUrl } from "./config";
// 创建axios实例
const service = axios.create({
  validateStatus(status) {
    return status >= 200 && status < 504; // 设置默认的合法的状态
  },
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_URL_KEY
      : process.env.VUE_APP_BASE_URL, // api 的 base_url
  timeout: 15000 // 请求超时时间
});

// var path = location.href

// service.defaults.baseURL = "http://127.0.0.1:9003"
// service.defaults.baseURL = "http://192.168.0.104:9003"
service.defaults.baseURL = location.href
service.defaults.retry = 3; // 请求重试次数
service.defaults.retryDelay = 1000; // 请求重试时间间隔
service.defaults.shouldRetry = true; // 是否重试

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.postType === "formData") {
      config.headers["Content-Type"] = "multipart/form-data";
      return config;
    } else {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.headers["Accept-Language"] = "zh-CN";
      // config.data = qs.stringify(config.data); // qs序列化参数
      return config;
    }
  },
  error => {
    Message.error("接口报错");
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      Message.error("接口报错");
      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  },
  err => {
    return Promise.reject(err); //响应错误时返回错误信息
  }
);

export default service;
