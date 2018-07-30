import React from 'react';
import PropTypes from 'prop-types';
import css from './Lines.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/keywords.json'

import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {

  render() {
    if (!this.state.lines) {
      return <div>Loading...</div>
    }

    return (
      <section className={css.lines}>
        <Description content={content.description} />
        <Filter {...this.props} candidates={this.state.lines} />
        <Social />
      </section>
    )
  }
}

export default Lines;
