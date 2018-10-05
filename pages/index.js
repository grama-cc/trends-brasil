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
      lang: 'port',
      period: 'month',
      load: false,
      round: 2
    };
  }

  onFilter = async (id) => {
    this.setState({ filter: id });
  }

  onChangeLang = (lang) => {
    this.setState({ lang: lang })
  }

  onClickPeriod = (period) => {
    this.setState({ period: period })
    this.getData(period);
  }

  onClickRound = (round) => {
    this.setState({ round: round })
    // this.getData(round);
  }

  getData = async (period, round) => {
    const candidates = await Api.getCandidates();
    this.setState({ candidates });

    const words = await Api.getWords(period);
    this.setState({ words });

    const bars = await Api.getBar();
    this.setState({ bars });
  }

  componentDidMount() {
    this.getData();
    if(window) {
      window.onload = () => {
        this.setState({ load: true })
      }
    }
  }

  render() {
    let candidates = this.state.candidates;
    const words = this.state.words;
    const bars = this.state.bars;

    // let candidates = this.props.candidates;
    if(this.state.round === 2) {
      if(candidates){
        candidates = candidates.filter((c) => c.second_round);
      }
    }

    return (

      <Layout>
        <Head
          title="Na busca do candidato"
          description="Descubra as eleições brasileiras de 2018 através das lentes do Google Trends."
          image="https://www.nabuscadocandidato.com.br/static/img/share.jpg"
          twitter="https://www.nabuscadocandidato.com.br/static/img/twt.png"
          url='https://www.nabuscadocandidato.com.br/'
        />
         
        <Intro
          arrowColor='#b4b4b4'
          onChangeLang={this.onChangeLang} 
          lang={this.state.lang}

          round={this.state.round}
          onClickRound={this.onClickRound}
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

          round={this.state.round}
          load={this.state.load}
        />

        <Lines
          onFilter={this.onFilter} 
          filter={this.state.filter}
          candidates={candidates}
          arrowColor='#b4b4b4'
          lang={this.state.lang}
          load={this.state.load}
          round={this.state.round}
        />

        <Category
          arrowColor='#b4b4b4'
          lang={this.state.lang}
          candidates={candidates}
          words={words}
          load={this.state.load}
          round={this.state.round}
        />

        <Radar
          onFilter={this.onFilter} 
          filter={this.state.filter}
          candidates={candidates}
          arrowColor='#fff'
          lang={this.state.lang}
          load={this.state.load}
          round={this.state.round}
        />

        <Relationship 
          candidates={candidates}
          arrowColor='#b4b4b4'
          lang={this.state.lang}
          load={this.state.load}
          round={this.state.round}
        />

        <Orbital
          onFilter={this.onFilter} 
          filter={this.state.filter}
          candidates={candidates}
          arrowColor='#fff'
          lang={this.state.lang}
          load={this.state.load}
          round={this.state.round}
        />

        <Footer
          lang={this.state.lang}
        />

        <Clipping 
          lang={this.state.lang}
        />
      </Layout>
    );
  }
}

export default Home;
