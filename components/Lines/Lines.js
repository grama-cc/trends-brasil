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
    const data = { 
      series0: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
      series1: [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
      series2: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]          
    };

    const size = { width: 900, height: 300 };

    const xScale = d3.scaleLinear()
      .domain([0, 6])
      .range([0, 900]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([300, 0]);

    const path = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })

    return (
      <svg 
        width={900} 
        height={300}
        style={{
          backgroundColor: 'pink'
        }}
      >
        <path
          d={path(data.series0)}
          stroke={`#000`}
          strokeWidth={2}
          fill="none"
        />
        <path 
          d={path(data.series1)}
          stroke={`#000`}
          strokeWidth={2}
          fill="none"
        />
        <path 
          d={path(data.series2)}
          stroke={`#000`}
          strokeWidth={2}
          fill="none"
        />
      </svg>
    )
  }

  render() {
    return (
      <section className={css.lines}>

        <div className={css.info}>
          <Description
            content={content.description}
            arrowColor={this.props.arrowColor}
          />
          {this.renderFilter()}
        </div>

        <div className={css.chart}>
          {this.renderChart()}
        </div>

				{/*<Period
          bgColor='#fff'
          color='#b4b4b4'
          arrowColor={this.props.arrowColor}
        />*/}
				<Social stroke='#b4b4b4' />
      </section>
    )
  }
}

export default Lines;
