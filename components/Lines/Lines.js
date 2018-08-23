import React from 'react';
import css from './Lines.scss';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import Api from '../../lib/Api';
import content from '../../static/json/lines.json'

import data from './data.js'

import Period from '../Period/Period.js';
import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.cfg = {
      width: 1000,
      height: 420,
      rect: 20,
      margin: { top: 0, right: 0, bottom: 0, left: 30 },
    }
  }

  componentDidMount() {
    // http://brasil-trends.herokuapp.com/v1/dates/1/
    // http://brasil-trends.herokuapp.com/v1/candidate_line/?candidate_id=2
    // http://brasil-trends.herokuapp.com/v1/aggregated_line/

    this.getData();
  }

  getData = async () => {
    const dates = await Api.getDates();
    const aggregatedLine = await Api.getAggregatedLine();
    const candidateLine = await Api.getCandidateLine(3);
    this.setState({
      dates,
      aggregatedLine,
      candidateLine,
    });
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

  renderChart () {
    const axisExtraMargin = 12;

    const lastTimestamp = data[0].lines[data[0].lines.length-1].timestamp;
    const end = new Date(lastTimestamp * 1000);
    const start = d3.timeDay.offset(end, -7); // TODO colocar no setState opção de 7 ou 30 dias

    const scaleTime = d3.scaleTime()
      .domain([start, end])
      .range([0, this.cfg.width])

    const axis = d3Axis.axisBottom()
      .scale(scaleTime)
      .tickSize(-this.cfg.height - 2*axisExtraMargin) // line-height
      .tickPadding([5]) // text padding
      .tickFormat(d => `${d.getDate()}/${d.getMonth()+1}`)
      .ticks(d3.timeDay.every(1));

    d3.select(this.axisElement).call(axis);

    const scalePercent = d3.scaleLinear()
      .domain([0, 100])
      .range([this.cfg.height, 0])

    const lineGenerator = d3.line()
      .curve(d3.curveCatmullRom.alpha(1))
      .x(d => scaleTime(new Date(d.timestamp * 1000)))
      .y(d => scalePercent(d.percent))

    return (
      <React.Fragment>
        <svg 
          className={css.chart}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.cfg.width} ${this.cfg.height}`}
          preserveAspectRatio="none"
        >
          <g className={css.lines}>
            {data.map((candidate, i) => (
              <path
                key={i}
                d={lineGenerator(candidate.lines)}
                stroke={candidate.color}
              />
            ))}
          </g>
          <g
            className={css.axis}
            transform={`translate(0, ${this.cfg.height + axisExtraMargin})`}
            ref={(y) => { this.axisElement = y; }}
          />
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
            lang={this.props.lang}
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
