import axios from 'axios';
import Vue from 'vue';

// axios.defaults.baseURL = process.env.API_ROOT;
// develop address: http://brain.vipgz1.idcfengye.com
// productive address: http://125.216.112.121:8083
axios.defaults.baseURL = 'http://125.216.112.121:8083';// replace the apr root here
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.response.use(
  response =>
  // Do something with response data
    response
  , (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

const handleResponse = (res) => {
  console.log(res);
  const { data, status } = res.data;
  if (parseInt(status) !== 200) {
    return Promise.reject(res.data);
  } else {
    return Promise.resolve(data);
  }
};

export default Vue.prototype.$http = {
  get(url, query) {
    return axios.get(url, {
      params: query,
    }).then(handleResponse);
  },
  post(url, query) {
    return axios.post(url, query).then(handleResponse);
  },
  put(url, body) {
    return axios.put(url, body).then(handleResponse);
  },
  del(url, query) {
    return axios.delete(url, {
      params: query,
    }).then(handleResponse);
  },
};
