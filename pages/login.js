import React from 'react';

import Head from '../components/Head';
import Layout from '../components/Layout';
import { setUser } from '../store/user';
import { Router } from '../routes';

import css from './login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    setUser({ email: this.state.email });
    Router.pushRoute('/');
  }

  render() {
    return (
      <Layout>
        <Head title="Login" />
        <h1>Login</h1>
        <form onSubmit={this.onSubmit} className={css.form}>
          <input
            type="email"
            name="email"
            placeholder="email"
            className={css.input}
            value={this.state.email}
            onChange={this.onChangeInput}
          />
          <input
            type="password"
            name="password"
            placeholder="senha"
            className={css.input}
            value={this.state.password}
            onChange={this.onChangeInput}
          />
          <button>Entrar</button>
        </form>
      </Layout>
    );
  }
}

export default Login;
