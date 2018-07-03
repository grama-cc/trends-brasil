import React from 'react';

import css from './index.scss';
import Head from '../components/Head';
import Layout from '../components/Layout';

import Intro from '../components/Intro/Intro';
import Keywords from '../components/Keywords/Keywords';
import Category from '../components/Category/Category';
import Relationship from '../components/Relationship/Relationship';
import Footer from '../components/Footer/Footer';

import Api from '../lib/Api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: null,
      filter: 0,
      compare: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  onFilter = (id) => {
    this.setState({ filter: id })
  }

  onCompare = (id) => {
    this.setState({ compare: id })
  }

  getData = async () => {
    const candidate = await Api.get('/candidate.json');
    this.setState({ candidate });
  }

  render() {
    if (!this.state.candidate) {
      return <div>Loading...</div>
    }

    return (
      <Layout>
        <Head title="Trends Brasil" />
        <Intro />
        <Keywords data={this.state.candidate} />
        <Category />
        <Relationship 
          onfilter={this.onFilter} 
          oncompare={this.onCompare}
          filter={this.state.filter}
          compare={this.state.compare}
        />
        <Footer />
      </Layout>
    );
  }
}

export default Home;
