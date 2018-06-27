import React from 'react';
import PropTypes from 'prop-types';
import css from './Keywords.scss';
import Api from '../../lib/Api';

import content from '../../static/json/keywords.json'

import Description from '../Description.js';
import Select from './Select.js';
import Candidate from './Candidate.js';
import Graphic from './Graphic.js';
import Social from '../Social.js';

class Keywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 1,
    }
  }

  onChange = (val) => {
    this.setState({ 
      selected: val,
    })
  }

  render() {
    const data = this.props.data;
    const selected = this.state.selected;

    return (
      <section className={css.keywords} {...this.props}>

        <Description content={content.description} />
        <Select change={this.onChange} val={selected} content={content.select} />

        {selected === 1 ?
          <Graphic data={data} />
        : selected === 2 && data.length ?
          <Candidate data={data} />
        : null}

        <Social />

      </section>
    )
  }
}

export default Keywords;
