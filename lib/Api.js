import axios from 'axios';

const API_URL = 'https://brasil-trends.herokuapp.com';

class Api {
  get = (path) => (
    axios.get(`${API_URL}${path}`)
      .then(response => response.data)
      .catch(console.error) // eslint-disable-line no-console
  );

  getCandidates = (round) => {
    if ( round === 2 ) {

      return this.get('/v1/infos/?round=true')

    } else {

      return this.get('/v1/infos/')

    }
  };

  getAggregatedLine = (period, round) => {

    if (period === 'week') {

      if ( round === 2 ) {

        return this.get('/v1/aggregated_line/?round=true/?period=now%207-d')

      } else {

        return this.get('/v1/aggregated_line/?period=now%207-d')

      }
    
    } else {

      if ( round === 2 ) {

        return this.get('/v1/aggregated_line/?round=true')

      } else {

        return this.get('/v1/aggregated_line/')

      }
    }
  };

  getRadar = ( period, round ) => {
    if( period === 'week') {
      if ( round === 2 ) {
        return this.get('/r2/radar/?period=now%207-d')
      } else {
        return this.get( '/v1/radar/?period=now%207-d' )
      }
    } else {
      if ( round === 2 ) {
        return this.get('/r2/radar/')
      } else {
        return this.get('/v1/radar/')
      }
    }
  };









  getWords = (period) => {
    if(period === 'week') {
      return this.get('/v1/word/?period=now%207-d')
    } else {
      return this.get('/v1/word/')
    }
  };

  getWordsCategory = () => {
    return this.get('/v1/word_category/')
  };

  getOrbit = (period) => {
    if(period === 'week') {
      return this.get('/v1/orbit/?period=now%207-d')
    } else {
      return this.get('/v1/orbit/')
    }
  };

  getDates = () => {
    return this.get('/v1/dates/')
  };

  getCandidateLine = (period, candidateId) => {
    if (period === 'week') {
      return this.get(`/v1/candidate_line/?candidate_id=${candidateId}&period=now%207-d`)
    } else {
      return this.get(`/v1/candidate_line/?candidate_id=${candidateId}`)
    }
  };

  getBars = () => {
    return this.get('/v1/bar/')
  };

  getBar = () => {
    return this.get('/v1/new_bar/')
  };

  getRelationship = (id1, id2) => {
    return this.get(`/v1/relationship/?c1=${id1}&c2=${id2}`)
  };
}

export default new Api();

