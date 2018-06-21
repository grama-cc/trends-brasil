import React from 'react';
import { connect } from 'react-redux';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Api from '../lib/Api';

import css from './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const data = await Api.get('/candidate/');
    this.setState({ data });
  }

  render() {
    return (
      <Layout>
        <Head title="Home" />
        <h1 className={css.title}>Home</h1>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </Layout>
    );
  }
}

const mapStateToProps = ({ user, auth }) => ({ user, auth });

export default connect(mapStateToProps)(Home);
