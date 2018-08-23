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
import Clipping from '../components/Footer/Clipping';

// import { i18n } from '../common/locale/i18n';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      compare: null,
      candidates: null,
      words: null,
      lang: 'port'
    };
  }

  onFilter = (id) => {
    this.setState({ filter: id })
  }

  onCompare = (id) => {
    this.setState({ compare: id })
  }

  onChangeLang = (lang) => {
    this.setState({ lang: lang })
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
    

    //if(!this.state.candidates && !this.state.words) {
      //return <div className={css.loading}>Loading...</div>
    //} 

    const candidates = this.state.candidates;
    const words = this.state.words;

    return (

      <Layout>
        <Head title="Trends Brasil" />
         
        <Intro
          arrowColor='#b4b4b4'
          onChangeLang={this.onChangeLang} 
          lang={this.state.lang}
        />

        <Keywords
          candidates={candidates}
          words={words}
          onFilter={this.onFilter} 
          filter={this.state.filter}
          arrowColor='#b4b4b4'
          lang={this.state.lang}
        />

        <Lines
          onFilter={this.onFilter} 
          filter={this.state.filter}
          candidates={candidates}
          arrowColor='#b4b4b4'
          lang={this.state.lang}
        />

        <Category
          arrowColor='#b4b4b4'
          lang={this.state.lang}
          candidates={candidates}
          words={words}
        />

        <Radar
          onFilter={this.onFilter} 
          filter={this.state.filter}
          candidates={candidates}
          arrowColor='#fff'
          lang={this.state.lang}
        />

        <Relationship 
          onFilter={this.onFilter} 
          onCompare={this.onCompare}
          filter={this.state.filter}
          compare={this.state.compare}
          candidates={candidates}
          words={words}
          arrowColor='#b4b4b4'
          lang={this.state.lang}
        />

        <Orbital
          onFilter={this.onFilter} 
          filter={this.state.filter}
          candidates={candidates}
          arrowColor='#fff'
          lang={this.state.lang}
        />
        <Footer
          lang={this.state.lang}
        />
        {/*<Clipping />*/}
      </Layout>
    );
  }
}

export default Home;
