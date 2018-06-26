import axios from 'axios';

const API_URL = process.env.API_URL;

class Api {
  get = path => (
    axios.get(`${API_URL}${path}`)
      .then(response => response.data)
      .catch(console.error) // eslint-disable-line no-console
  );
}

export default new Api();
