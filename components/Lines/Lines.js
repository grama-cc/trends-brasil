import React from 'react';
import PropTypes from 'prop-types';
import css from './Lines.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/lines.json'

import Filter from '../Filter.js';
import Period from '../Period/Period.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {

  renderFilter () {
    if (!this.props.candidates) {
      return
    } else {
      return (
        <Filter 
          onFilter={this.props.onFilter} 
          filter={this.props.filter}
          candidates={this.props.candidates}
          all
          arrowColor='#b4b4b4'
        />
      )
    }
  }

  renderChart () {
    if (!this.props.candidates) {
      return <div className={css.loading}>Loading...</div>
    } else {
      return (
        <h2>Linhas</h2>
      )
    }
  }

  render() {
    return (
      <section className={css.lines}>

        <div className={css.info}>
          <Description content="lines" />
          <Filter 
            onFilter={this.props.onFilter} 
            filter={this.props.filter}
            candidates={this.props.candidates} 
          />
          {this.renderFilter()}
        </div>

        <div className={css.chart}>
          {this.renderChart()}
        </div>

				<Period
          bgColor='#fff'
          color='#b4b4b4'
          arrowColor={this.props.arrowColor}
        />
				<Social stroke='#b4b4b4' />
      </section>
    )
  }
}

export default Lines;
