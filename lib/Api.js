import axios from 'axios';

// const API_URL = process.env.API_URL;
// API_URL=https://brasil-trends.herokuapp.com/v1 .env

const API_URL = 'https://brasil-trends.herokuapp.com/v1';
const API_LOCAL = 'http://localhost:3000/static/data';

class Api {
  get = (path) => (
    axios.get(`${API_URL}${path}`)
      .then(response => response.data)
      .catch(console.error) // eslint-disable-line no-console
  );

  getCandidates = () => {
    return this.get('/candidate/')
  };

  getWords = () => {
    return this.get('/word/')
  };

  getRadar = () => {
    return this.get('/radar/')
  };

  getOrbit = () => {
    return this.get('/orbit/')
  };

  getLines = () => {
    return this.get(`${API_LOCAL}/lines/`)
  };

  getBars = () => {
    return this.get('/bar/')
  };
  getBar = () => {
    return this.get('/new_bar/')
  };

  // https://brasil-trends.herokuapp.com/v1/relationship/?c1=4&c2=1
  getRelationship = (id1, id2) => {
    return this.get(`/relationship/?c1=${id1}&c2=${id2}`)
  };


}

export default new Api();

