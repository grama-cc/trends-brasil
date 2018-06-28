import React from 'react';
// import { connect } from 'react-redux';

import Head from '../components/Head';
import Layout from '../components/Layout';

import Intro from '../components/Intro/Intro';
import Keywords from '../components/Keywords/Keywords';
import Footer from '../components/Footer/Footer';

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
        <Footer />
      </Layout>
    );
  }
}

export default Home;
