import axios from 'axios';

const API_URL = process.env.API_URL;
// const API_URL = 'https://brasil-trends.herokuapp.com/v1';
// const API_URL = 'http://localhost:3000/static';

class Api {
  get = path => (
    axios.get(`${API_URL}${path}`)
      .then(response => response.data)
      .catch(console.error) // eslint-disable-line no-console
  );
}

export default new Api();
