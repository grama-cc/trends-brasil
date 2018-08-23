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
      relationship: null,
      bars: null,
      lang: 'port'
    };
  }

  onFilter = async (id) => {
    this.setState({ filter: id });

    if(id && this.state.compare) {
      const relationship = await Api.getRelationship(id, this.state.compare);
      this.setState({relationship: relationship.intersection});
    } else {
      this.setState({relationship: null});
    }
  }

  onCompare = async (id) => {
    this.setState({ compare: id });
   
    if(this.state.filter && id) {
      const relationship = await Api.getRelationship(this.state.filter, id);
      this.setState({relationship: relationship.intersection});
    } else {
      this.setState({relationship: null});
    }
  }

  onChangeLang = (lang) => {
    this.setState({ lang: lang })
  }

  getData = async () => {
    const candidates = await Api.getCandidates();
    this.setState({ candidates });
    const words = await Api.getWords();
    this.setState({ words });
    const bars = await Api.getBar();
    const teste = await Api.getBar();
    this.setState({ bars });
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
    const bars = this.state.bars;

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

        <Category
          arrowColor='#b4b4b4'
          lang={this.state.lang}
          candidates={candidates}
          words={words}
          bars={bars}
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
          relationship={this.state.relationship}
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
