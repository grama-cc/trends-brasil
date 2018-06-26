import React from 'react';
// import { connect } from 'react-redux';

import Head from '../components/Head';
import Layout from '../components/Layout';

import Intro from '../components/Intro/Intro';
import Keywords from '../components/Keywords/Keywords';

import Api from '../lib/Api';

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
    // const data = await Api.get('/data/keywords.json');
    this.setState({ data });
  }

  render() {
    if (!this.state.data) {
      return <div>Loading...</div>
    }

    return (
      <Layout>
        <Head title="Trends Brasil" />
        <Intro />
        <Keywords data={this.state.data} />
      </Layout>
    );
  }
}

export default Home;
