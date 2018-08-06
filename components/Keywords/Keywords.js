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

  render() {

    if(!this.props.candidates && !this.props.words) {
      return <div className={css.loading}>Loading...</div>
    }

    const candidates = this.props.candidates
    const words = this.props.words
    const view = this.state.view;

    return (
      <section className={css.keywords} id='keywords'>
        <div className={css.info}>
          <Description content={content.description} />
        </div>
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
          />
        </div>

        <Period 
          bgColor='#f8f8f8'
          color='#b4b4b4'
        />
        <Social stroke='#b4b4b4' bottom />
      </section>
    )
  }
}

export default Keywords;
