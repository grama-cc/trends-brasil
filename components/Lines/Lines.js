import React from 'react';
import css from './Lines.scss';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import Api from '../../lib/Api';
import content from '../../static/json/lines.json'

import Period from '../Period/Period.js';
import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      specialDates: null,
      period: 'month',
    };
    this.cfg = {
      width: 900,
      height: 320,
      rect: 20,
      margin: { top: 0, right: 0, bottom: 0, left: 30 },
    }
  }

  componentDidMount() {
    this.setupFirstData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      this.updateCandidate()
    }

    const svg = d3.select(this.svg);

    svg.selectAll(`.${css.date}`).each(function() {
      const text = d3.select(this).select('text');
      const width = text.node().getBBox().width + 20;

      d3.select(this).select('rect')
        .attr('width', width)
        .attr('x', -width / 2)
    });
  }

  setupFirstData = async () => {
    const data = await this.getData();
    const specialDates = await Api.getDates();
    this.setState({ data, specialDates });
  }

  getData = async (period) => {
    if (this.props.filter) {
      return [await Api.getCandidateLine(period, this.props.filter)];
    } else {
      return await Api.getAggregatedLine(period)
    }
  }

  updateCandidate = async () => {
    const data = await this.getData(this.state.period);
    this.setState({ data });
  }

  onClickPeriod = async (period) => {
    const data = await this.getData(period);
    this.setState({ period, data });
  }

  getDate = (timezone) => {
    // hard convert to midday, so no timezone will modify the day
    const safeTime = `${timezone.substring(0,10)}T12:00:00-03:00`;
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
    if (!this.state.data || !this.state.specialDates) {
      return <div>Loading...</div>
    }

    const firstLines = this.state.data[0].lines;
    const lastDate = firstLines[firstLines.length-1].date;
    const end = this.getDate(lastDate);
    const start = d3.timeDay.offset(end, this.state.period === 'week' ? -7 : -30);

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
      <React.Fragment>
        <p className={css.percent}>Valores entre 0 e 100 indexados pelo Google Trends</p>
        <div className={css.chart_container}>
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
              {this.state.data.map((candidate) => (
                <path
                  key={candidate.id}
                  d={lineGenerator(candidate.lines)}
                  stroke={candidate.color}
                />
              ))}
            </g>
            {this.state.specialDates.map((date) => (
              <g
                key={date.id}
                className={css.date}
                transform={`translate(${scaleTime(this.getDate(date.date))}, 0)`}
              >
                <line y2={this.cfg.height} />
                <rect 
                  y="-25"
                  height="20"
                  rx="10"
                  ry="10"
                />
                <text 
                  textAnchor="middle"
                >            
                  {date.text}
                </text>
                {this.state.data.map((candidate, i) => (
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
        </div>
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
          <div className={css.line_filter}>{this.renderFilter()}</div>
        </div>
        
        {this.renderChart()}

				<Period
          bgColor='#fff'
          color='#b4b4b4'
          arrowColor={this.props.arrowColor}
          all
          period={this.state.period}
          onClickPeriod={this.onClickPeriod}
        />
				<Social stroke='#b4b4b4' />
      </section>
    )
  }

}

export default Lines;
