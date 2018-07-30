import axios from 'axios';

// const API_URL = process.env.API_URL;
// API_URL=https://brasil-trends.herokuapp.com/v1 .env

const API_URL = 'https://brasil-trends.herokuapp.com/v1';
const API_LOCAL = 'http://localhost:3000/static/data';

class Api {
  get = path => (
    axios.get(`${API_URL}${path}`)
      .then(response => response.data)
      .catch(console.error) // eslint-disable-line no-console
  );

  getCandidate = () => {
    return axios.get(`${API_URL}/candidate/`)
    .then(response => response.data)
   	.catch(console.error) 
  };

  getWord = () => {
    return axios.get(`${API_URL}/word/`)
    .then(response => response.data)
   	.catch(console.error) 
  };

  getRadar = () => {
    return axios.get(`${API_URL}/radar/`)
    .then(response => response.data)
    .catch(console.error) 
  };

  getOrbit = () => {
    return axios.get(`${API_URL}/orbit/`)
    .then(response => response.data)
    .catch(console.error) 
  };

  // https://brasil-trends.herokuapp.com/v1/relationship/?c1=4&c2=1
  /*getRelationship = () => {
    return axios.get(`${API_URL}/relationship/?c1=${id1}&c2=${id2}`)
    .then(response => response.data)
    .catch(console.error) 
  };*/


}

export default new Api();

