import React from 'react';

import Api from '../lib/Api';

import css from './index.scss';
import Head from '../components/Head';
import Layout from '../components/Layout';

import Intro from '../components/Intro/Intro';
import Keywords from '../components/Keywords/Keywords';
import Lines from '../components/Lines/Lines';
import Category from '../components/Category/Category';
import Radar from '../components/Radar/Radar';
import Relationship from '../components/Relationship/Relationship';
import Orbital from '../components/Orbital/Orbital';
import Footer from '../components/Footer/Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      compare: null,
      candidates: null,
      words: null,
    };
  }

  onFilter = (id) => {
    this.setState({ filter: id })
  }

  onCompare = (id) => {
    this.setState({ compare: id })
  }

  getData = async () => {
    const candidates = await Api.getCandidates();
    const words = await Api.getWords();
    this.setState({ candidates, words });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const candidates = this.state.candidates;
    const words = this.state.words;

    console.log('component: index ', 'filter id: ', this.state.filter )

    return (
      <Layout>
        <Head title="Trends Brasil" />
        
        {/*<Intro />*/}

        <Keywords
          candidates={candidates}
          words={words}
          onFilter={this.onFilter} 
          filter={this.state.filter}
        />

        {/*<Lines />
        <Category />
        <Radar
          onfilter={this.onFilter} 
          filter={this.state.filter}
        />
        <Relationship 
          onfilter={this.onFilter} 
          oncompare={this.onCompare}
          filter={this.state.filter}
          compare={this.state.compare}
        />
        <Orbital
          onfilter={this.onFilter} 
          filter={this.state.filter}
        />
        <Footer />*/}
        
      </Layout>
    );
  }
}

export default Home;
