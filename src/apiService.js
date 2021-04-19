import axios from 'axios';

const api = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: { 'content-Type': 'application/json' }
});

api.interceptors.request.use(
  (request) => {
    // console.log('Start Request', request);
    return request;
  },
  function (error) {
    // console.log('REQUEST ERROR', error);
  }
);

api.interceptors.response.use((response) => {
  // console.log('RESPONSE', response);
  return response;
}, function(error) {
  error = error.response.data;
  // console.log('Response Error', error);
  return Promise.reject({message: error.split('\n')});
});

export default api;