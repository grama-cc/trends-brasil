import axios from 'axios';

const API_URL = 'https://brasil-trends.herokuapp.com/v1';

class Api {
  get = (path) => (
    axios.get(`${API_URL}${path}`)
      .then(response => response.data)
      .catch(console.error) // eslint-disable-line no-console
  );

  getCandidates = () => {
    return this.get('/infos/')
  };

  getWords = (period) => {
    if(period === 'week') {
      return this.get('/word/?period=now%207-d')
    } else {
      return this.get('/word/')
    }
  };

  getWordsCategory = () => {
    return this.get('/word_category/')
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

  getCandidateLine = (period, candidateId) => {
    if (period === 'week') {
      return this.get(`/candidate_line/?candidate_id=${candidateId}&period=now%207-d`)
    } else {
      return this.get(`/candidate_line/?candidate_id=${candidateId}`)
    }
  };

  getBars = () => {
    return this.get('/bar/')
  };

  getBar = () => {
    return this.get('/new_bar/')
  };

  getRelationship = (id1, id2) => {
    return this.get(`/relationship/?c1=${id1}&c2=${id2}`)
  };
}

export default new Api();

