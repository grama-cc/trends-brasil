import React from 'react';
import PropTypes from 'prop-types';

import css from './Keywords.scss';
import content from '../../static/json/keywords.json'

import Description from '../Description.js';
import Select from './Select.js';
import Period from '../Period/Period.js';
import Candidate from './Candidate.js';
import Graphic from './Graphic.js';
import Social from '../Social/Social.js';

import Api from '../../lib/Api';

class Keywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'balls'
    }
  }

  onChangeView = (val) => {
    this.setState({ view: val })
  }

  renderChart(candidates, words, view) {
    if(!this.props.candidates && !this.props.words) {
      return <div className={css.loading}>Loading...</div>
    }

    const candidates = this.props.candidates
    const words = this.props.words
    const view = this.state.view;

    return (
      <section className={css.keywords} id='keywords'>
        <Description content="keywords" />
        <div>
          <Select
            click={this.onChangeView}
            val={view}
            content={content.select}
          />
          <Graphic
            val={view}
            candidates={candidates}
            words={words}
            onFilter={this.props.onFilter} 
            filter={this.props.filter}
          />
          <Candidate
            val={view}
            candidates={candidates}
            words={words}
            onFilter={this.props.onFilter} 
            filter={this.props.filter}
            content={content}
          />
        </React.Fragment>
      )
    }
  }

  render() {

    const candidates = this.props.candidates
    const words = this.props.words
    const view = this.state.view;

    return (
      <section className={css.keywords} id='keywords'>
        <div className={css.info}>
          <Description
            content={content.description}
            arrowColor={this.props.arrowColor}
          />
        </div>
        <div className={css.container}>
          <Select
            click={this.onChangeView}
            val={view}
            content={content.select}
          />
          { this.renderChart(candidates, words, view) }
        </div>

        {/*<Period 
          bgColor='#f8f8f8'
          color='#b4b4b4'
          bottom
          arrowColor={this.props.arrowColor}
        />*/}
        <Social stroke='#b4b4b4' bottom />
      </section>
    )
  }
}

export default Keywords;
