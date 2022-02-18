import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = 'http://127.0.0.1:3333/api/v1'; 

const getUrl = () =>{
    return isLocalhost() ? 'https://localhost:5001/api/' : 'https://todo-dimpy.herokuapp.com/api/'
}

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

/** @param {string} resource */ 
const getAll = (resource) => { 
  return axios 
    .get(`${BASE_URL}/${resource}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {string} id */ 
const getSingle = (resource, id) => { 
  return axios 
    .get(`${getUrl()}/${resource}/${id}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const post = (resource, model) => { 
  return axios 
    .post(`${BASE_URL}/${resource}`, model) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const put = (resource, model) => { 
  return axios 
    .put(`${BASE_URL}/${resource}`, model) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const patch = (resource, model) => { 
  return axios 
    .patch(`${BASE_URL}/${resource}`, model) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

/** @param {string} resource */ 
/** @param {string} id */ 
const remove = (resource, id) => { 
  return axios 
    .delete(`${BASE_URL}/${resource}`, id) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const apiProvider = { 
  getAll, 
  getSingle, 
  post, 
  put, 
  patch, 
  remove, 
};