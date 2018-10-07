import React from 'react';
import css from './Lines.scss';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import Api from '../../lib/Api';
import {i18n} from '../../common/locale/i18n';

import Period from '../Period/Period.js';
import Filter from '../Filter.js';
import Description from '../Description/Description.js';
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

  getData = async (period, round) => {
    return await Api.getAggregatedLine(period, this.props.round)
  }

  updateCandidate = async () => {
    const data = await this.getData(this.state.period, this.props.round);
    this.setState({ data });
  }

  onClickPeriod = async (period, round) => {
    const data = await this.getData(period, this.props.round);
    this.setState({ period, data });
  }

  getDate = (timezone) => {
    const safeTime = `${timezone}T12:00:00-03:00`
    return d3.timeDay.floor(new Date(safeTime));
  }

  getPercent = (candidate, date) => {
    const line = candidate.lines.find(l => (
      this.getDate(l.date) === this.getDate(date)
    ))
    return line ? line.percent : 0;
  }

  renderFilter () {
    if (!this.props.candidates || !this.props.load) {

      return

    } else {

      return (
        <Filter 
          onFilter={this.props.onFilter} 
          filter={this.props.filter}
          candidates={this.props.candidates}
          all={this.props.round === 2 ? false : true}
          arrowColor='#b4b4b4'
          lineFilter
          lang={this.props.lang}
          round={this.props.round}
        />
      )
    }
  }

  renderChart () {
    if (!this.state.data || !this.state.specialDates || !this.props.candidates) {
      return <div>Loading...</div>
    }

    let candidates = this.props.candidates;
    let data = this.state.data;

    const firstLines = data[0].lines;

    const lastDate = this.props.round === 2 ? firstLines[firstLines.length-1].day : '2018-10-09';
    const end = this.getDate(lastDate);
    const start = d3.timeDay.offset(end, this.state.period === 'week' ? -7 : -29);

    const lang = this.props.lang;
    const filter = this.props.filter;
    candidates = data ? data.filter((c) => filter === c.id) : [];

    // axis
    const scaleTime = d3.scaleTime()
      .domain([start, end])
      .range([-24, ( this.cfg.width + 24 )])
    
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
      .curve(d3.curveBasis)
      .x(d => scaleTime(this.getDate(d.day)))
      .y(d => scalePercent(d.percent))

    data = data.sort((a, b) => {
      if (a.id === filter) {
        return 1;
      }
      if (b.id === filter) {
        return -1;
      }
      return 0;
    });

    return (
      <React.Fragment>
        <p className={css.percent}>{i18n('lines.legend', lang)}</p>
        <div className={css.chart_container}>
          <div className={css.space}/>
          <svg 
            className={css.chart}
            viewBox={`0 -30 ${this.cfg.width} 380`}
            ref={(c) => { this.svg = c; }}
          >
            <title>{i18n('lines.title', lang)}</title>
            <defs>
              <text className='description'>
                {i18n('lines.description', lang)}
                {i18n('lines.highlight', lang)}
              </text>
              <text className='more'>
                {i18n('lines.button', lang)} - {i18n('lines.more', lang)}
              </text>
            </defs>
            <g
              className={css.axis}
              transform={`translate(0, ${this.cfg.height - 10})`}
              ref={(c) => { this.axisElement = c; }}
              strokeDasharray={2}
              strokeOpacity={0.2}
              strokeWidth={1}
            />
            <g>
              {data.map((candidate) => (
                <path
                  key={candidate.id}
                  d={lineGenerator(candidate.lines)}
                  fillOpacity={this.props.filter === candidate.id ? .5 : 0}
                  fill={this.props.filter === candidate.id ? candidate.color : 'none'}
                  data-id={candidate.id}
                  opacity={this.props.filter === candidate.id ? 1 : 0.5}
                  strokeWidth={this.props.filter && this.props.filter != candidate.id ? 2 : 3}
                  stroke={this.props.filter && this.props.filter != candidate.id ? '#ccc' : candidate.color}
                />
              ))}
            </g>
            
            {this.state.specialDates.map((date, i) => (
              <g
                key={i}
                className={css.date}
                transform={`translate(${scaleTime(this.getDate(date.day))}, 0)`}
              >
                <line 
                  y2={this.cfg.height - 10}
                  stroke="#000"
                />
                <rect 
                  y="-25"
                  height="20"
                  rx="10"
                  ry="10"
                  fill='#000'
                />
                <text
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10px"
                  transform={`translate(0, -11)`}
                  fontWeight={500}
                  style={{
                    textTransform: "uppercase"
                  }}
                >         
                  {date.text}
                </text>
              </g>
            ))}
          </svg>
          <div className={`${css.space} ${css.right}`}/>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <section className={css.lines} id='lines'>
        <div className={css.info}>
          <Description
            content='lines'
            arrowColor={this.props.arrowColor}
            lang={this.props.lang}
          />
          {this.props.round === 2 ? null : <div className={css.line_filter}>{this.renderFilter()}</div>}
        </div>
        
        {this.renderChart()}

				<Period
          bgColor='#fff'
          color='#b4b4b4'
          arrowColor={this.props.arrowColor}
          all
          period={this.state.period}
          onClickPeriod={this.onClickPeriod}
          lang={this.props.lang}
        />
				<Social
          stroke='#b4b4b4'
          id='lines'
          parent="Lines_chart_container_1hkMp"
          lang={this.props.lang}
        />
      </section>
    )
  }

}

export default Lines;
