import React from 'react';
import PropTypes from 'prop-types';
import css from './Lines.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/keywords.json'

import Filter from '../Filter.js';
import Period from '../Period/Period.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {

  render() {

  	if (!this.props.candidates) {
      return <div className={css.loading}>Loading...</div>
    }

    return (
      <section className={css.lines}>

        <div className={css.info}>
          <Description content={content.description} />
          <Filter 
            onFilter={this.props.onFilter} 
            filter={this.props.filter}
            candidates={this.props.candidates} 
          />
        </div>

        <div className={css.chart}>
          <h2>Linhas</h2>
        </div>

				<Period
          bgColor='#fff'
          color='#b4b4b4'
        />
				<Social stroke='#b4b4b4' />
      </section>
    )
  }
}

export default Lines;
