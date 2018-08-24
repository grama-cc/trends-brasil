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
      lang: 'port',
      period: 'month'
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

  onClickPeriod = (period) => {
    this.setState({ period: period })
    this.getData(period);
  }

  getData = async (period) => {
    const candidates = await Api.getCandidates();
    this.setState({ candidates });

    const words = await Api.getWords(period);
    this.setState({ words });

    const bars = await Api.getBar();
    // const teste = await Api.getBar();
    this.setState({ bars });
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    const candidates = this.state.candidates;
    const words = this.state.words;
    const bars = this.state.bars;

    console.log(candidates)

    return (

      <Layout>
        <Head
          title="Trends Brasil"
          description="Na busca do candidato"
          image="/static/img/share.jpg"
        />
         
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

          period={this.state.period}
          onClickPeriod={this.onClickPeriod}
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
