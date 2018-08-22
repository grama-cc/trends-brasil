import React from 'react';
import css from './Lines.scss';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import Api from '../../lib/Api';
import content from '../../static/json/lines.json'

import data from './data.js'

import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {

  constructor(props) {
    super(props);
    this.cfg = {
      width: 1000,
      height: 420,
      rect: 20,
      margin: { top: 0, right: 0, bottom: 0, left: 30 },
      padding: 10,
    }
  }

  componentDidMount() {
    this.renderAxis();
  }

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

  timeConverter = (timestamp) => {
    const stamp = new Date(timestamp * 1000);
    const months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    const year = stamp.getFullYear();
    const month = months[stamp.getMonth()];
    const date = stamp.getDate();
    const hour = stamp.getHours();
    const min = stamp.getMinutes();
    const sec = stamp.getSeconds();
    const time = date + '/' + month;
    return time;
  }

  renderAxis() {

    const epa = data[0].lines[0].timestamp;
    console.log(this.timeConverter(epa));

    const xScale = d3.scaleBand()
      .padding(0.5)
      .domain(data[0].lines.map(d => this.timeConverter(d.timestamp)))
      .range([0, this.cfg.width])
    
    const axisType = `axisBottom`
    const axis = d3Axis[axisType]()
      .scale(xScale)
      .tickSize(-((this.cfg.height - 50) - this.cfg.margin.top - this.cfg.margin.bottom ))
      .tickPadding([12])
      .ticks([4])

    d3.select(this.axisElement).call(axis)
  }

  renderChart () {
    const h = this.cfg.height - 50;

    const xepa = d3.scaleLinear()
      .domain([0, 4])
      .range([0, 900]);

    const yepa = d3.scaleLinear()
      .domain([0, 100])
      .range([300, 0]);

  
    return (
      <React.Fragment>
        <svg 
          className={css.chart}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.cfg.width} ${h}`}
          preserveAspectRatio="none"
          style={{
            padding: `${this.cfg.padding}px 0`
          }}
        >
          <g
            transform={`translate(0, ${this.cfg.height - 65 - this.cfg.margin.bottom})`}
          >
            <g
              className={css.axis}
              ref={(y) => { this.axisElement = y; }}
            />

            {data.map((d, i) => {
                const path = d3.line()
                .x((l) => { return xepa(l.timestamp/1000000) })
                .y((l) => { return xepa(l.timestamp/1000000) })

                // console.log(path(d.lines))
              
              return (
                <path
                  key={i}
                  d={path(d.lines)}
                  stroke={`#000`}
                  strokeWidth={2}
                  fill="none"
                />
              )
            
            })}
          </g>
        </svg>

      
      </React.Fragment>
    )
  }

  render() {
    return (
      <section className={css.lines}>
        <div className={css.info}>
          <Description
            content='lines'
            arrowColor={this.props.arrowColor}
          />
          {this.renderFilter()}
        </div>
        
        {this.renderChart()}

				<Period
          bgColor='#fff'
          color='#b4b4b4'
          arrowColor={this.props.arrowColor}
          all
        />
				<Social stroke='#b4b4b4' />
      </section>
    )
  }

}

export default Lines;
