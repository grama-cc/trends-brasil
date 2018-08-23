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
      padding: 50,
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

  renderChart () {
    let minTimestamp = Infinity;
    let maxTimestamp = 0;
    let minPercent = Infinity;   
    let maxPercent = 0;

    data.forEach(candidate => {
      candidate.lines.forEach(line => {
        if (line.timestamp < minTimestamp) {
          minTimestamp = line.timestamp;
        }
        if (line.timestamp > maxTimestamp) {
          maxTimestamp = line.timestamp;
        }
        if (line.percent < minPercent) {
          minPercent = line.percent;
        }
        if (line.percent > maxPercent) {
          maxPercent = line.percent;
        }
      })
    })

    // TODO usar uma semana ou um mês
    // atualmente estamos usando todo o timestamp
    // desde o início até o fim
    // https://github.com/d3/d3-scale#time-scales  
    const scaleTime = d3.scaleTime()
      .domain([minTimestamp, maxTimestamp])
      .range([0, this.cfg.width])

    const scalePercent = d3.scaleLinear()
      .domain([minPercent, maxPercent])
      .range([this.cfg.height, 0])

    const linePath = d3.line()
      .x(d => scaleTime(d.timestamp))
      .y(d => scalePercent(d.percent))

    const end = new Date(maxTimestamp * 1000);
    const start = d3.timeDay.offset(end, -7); // TODO colocar no setState opção de 7 ou 30 dias

    const x = d3.scaleTime()
      .domain([start, end])
      .range([0, this.cfg.width])

    const axis = d3Axis.axisBottom()
      .scale(x)
      .tickSize(-this.cfg.height)
      .tickPadding([12])
      .tickFormat(d => `${d.getDate()}/${d.getMonth()+1}`)
      .ticks(d3.timeDay.every(1));

    d3.select(this.axisElement).call(axis)

    return (
      <React.Fragment>
        <svg 
          className={css.chart}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.cfg.width} ${this.cfg.height}`}
          preserveAspectRatio="none"
          style={{
            padding: `${this.cfg.padding}px`,
            backgroundColor: `purple`,
          }}
        >
          <g className={css.lines}>
            {data.map((d, i) => (
              <path
                key={i}
                d={linePath(d.lines)}
                // TODO aplicar uma cor para cada candidato
                // TODO desenhar linhas suaves com bezier(?)
              />
            ))}
          </g>
          <g
            className={css.axis}
            transform={`translate(0, ${this.cfg.height})`}
            ref={(y) => { this.axisElement = y; }}
          />
        </svg>
      </React.Fragment>
    )
  }

  render() {
    if (!this.state.dates) return null;
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
