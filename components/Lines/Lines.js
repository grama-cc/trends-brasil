import React from 'react';
import css from './Lines.scss';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import Api from '../../lib/Api';
import content from '../../static/json/lines.json'

import data from './data.js'
import specialDates from './specialDates.js'

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

  componentDidUpdate() {
    const svg = d3.select(this.svg);

    svg.selectAll(`.${css.date}`).each(function() {
      const text = d3.select(this).select('text');
      const width = text.node().getBBox().width + 20;

      d3.select(this).select('rect')
        .attr('width', width)
        .attr('x', -width / 2)
    });
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

  getDate = (timezone) => {
    // hard convert to midday, so no timezone will modify the day
    const safeTime = `${timezone.substring(0,11)}12:00:00-03:00`;
    return d3.timeDay.floor(new Date(safeTime));
  }

  getPercent = (candidate, date) => {
    const line = candidate.lines.find(l => (
      this.getDate(l.date).getTime() === this.getDate(date).getTime()
    ))
    return line ? line.percent : 0;
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
    const lastDate = data[0].lines[data[0].lines.length-1].date;
    const end = this.getDate(lastDate);
    const start = d3.timeDay.offset(end, -30); // TODO colocar no setState opção de 7 ou 30 dias

    // axis
    const scaleTime = d3.scaleTime()
      .domain([start, end])
      .range([0, this.cfg.width])

    const axis = d3Axis.axisBottom()
      .scale(scaleTime)
      .tickSize(-this.cfg.height) // vertical line height
      .tickPadding([5]) // text padding
      .tickFormat(d => `${d.getDate()}/${d.getMonth()+1}`)
      .ticks(d3.timeDay.every(1));

    d3.select(this.axisElement).call(axis);

    // lines
    const scalePercent = d3.scaleLinear()
      .domain([0, 100])
      .range([this.cfg.height - 12, 12])

    const lineGenerator = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => scaleTime(this.getDate(d.date)))
      .y(d => scalePercent(d.percent))

    return (
      <svg 
        className={css.chart}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${this.cfg.width} ${this.cfg.height}`}
        preserveAspectRatio="none"
        ref={(c) => { this.svg = c; }}
      >
        <g
          className={css.axis}
          transform={`translate(0, ${this.cfg.height})`}
          ref={(c) => { this.axisElement = c; }}
        />
        <g className={css.lines}>
          {data.map((candidate) => (
            <path
              key={candidate.id}
              d={lineGenerator(candidate.lines)}
              stroke={candidate.color}
            />
          ))}
        </g>
        {specialDates.map((date) => (
          <g
            key={date.id}
            className={css.date}
            transform={`translate(${scaleTime(this.getDate(date.date))}, 0)`}
          >
            <line y2={this.cfg.height} />
            <rect y="-13" height="20" rx="8" ry="8" />
            <text textAnchor="middle">{date.text}</text>
            {data.map((candidate, i) => (
              <circle
                key={candidate.id}
                r="4"
                cy={scalePercent(this.getPercent(candidate, date.date))}
                stroke={candidate.color}
              />
            ))}
          </g>
        ))}
      </svg>
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
