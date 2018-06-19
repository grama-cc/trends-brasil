import axios from 'axios';

const API_URL = 'http://localhost:3000/static';
//const API_URL = 'https://brasil-trends.herokuapp.com';

class Api {
  get = path => (
    axios.get(`${API_URL}${path}`)
      .then(response => response.data)
      .catch(console.error) // eslint-disable-line no-console
  );
}

export default new Api();
