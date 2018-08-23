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
    return this.get('/infos/')
  };

  getWords = () => {
    return this.get('/word/')

    /*if(period === 'week') {
      return this.get('/radar/?period=now%207-d')
    } else {
      return this.get('/radar/')
    }*/
    // https://brasil-trends.herokuapp.com/v1/word/?period=now%207-d
  };

  getRadar = (period) => {
    if(period === 'week') {
      return this.get('/radar/?period=now%207-d')
    } else {
      return this.get('/radar/')
    }
  };

  getOrbit = (period) => {
    if(period === 'week') {
      return this.get('/orbit/?period=now%207-d')
    } else {
      return this.get('/orbit/')
    }
  };

  // TODO esse endpoint ainda existe? posso remover?
  getLines = () => {
    return this.get(`${API_LOCAL}/lines/`)
  };

  getDates = () => {
    return this.get('/dates/')
  };

  getAggregatedLine = (period) => {
    if (period === 'week') {
      return this.get('/aggregated_line/?period=now%207-d')
    } else {
      return this.get('/aggregated_line/')
    }
  };

  getCandidateLine = (id) => {
    return this.get(`/candidate_line/?candidate_id=${id}`)
  };

  getBars = () => {
    return this.get('/bar/')
  };

  // https://brasil-trends.herokuapp.com/v1/relationship/?c1=4&c2=1
  getRelationship = (id1, id2) => {
    return this.get(`/relationship/?c1=${id1}&c2=${id2}`)
  };


}

export default new Api();

