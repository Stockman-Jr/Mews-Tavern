import axios from "axios";

axios.defaults.baseURL = 'https://mews-tavern.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

