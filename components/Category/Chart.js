import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import css from './Chart.scss'

import {i18n} from '../../common/locale/i18n';

class Chart extends React.Component { 

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

  renderAxis() {
    const yScale = d3.scaleLinear()
      .domain([0, this.props.data.max_value])
      .range([this.cfg.height - 45, this.cfg.margin.top])

    const axisType = `axisLeft`
    const axis = d3Axis[axisType]()
      .scale(yScale)
      .tickSize(-(this.cfg.width - this.cfg.margin.left))
      .tickPadding([12])
      .ticks(4)
    d3.select(this.axisElement).call(axis)
  }

  render() {
    
    const h = this.cfg.height - 45;
    const yScale = d3.scaleLinear().domain([0, this.props.data.max_value]).range([h, this.cfg.margin.top]);

    const lang = this.props.lang;

    let data = this.props.data.values;
    const candidates = this.props.candidates;
    const round = this.props.round;

    if(round === 2) {
      data = data.filter((c) => candidates[0].id == c.id || candidates[1].id == c.id);
    }

    return (
      <div className={css.container} type={this.props.type}>
        <p className={css.percent}>{i18n('category.legend', lang)}</p>
        <svg
          className={css.chart}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.cfg.width} ${h + 60}`}
        >
          <title>{i18n('category.title', lang)}</title>
          <defs>
            <text className='description'>
              {i18n('category.description', lang)}
              {i18n('category.highlight', lang)}
            </text>
            <text className='more'>
              {i18n('category.button', lang)} - {i18n('category.more', lang)}
            </text>

            <filter id="pictureFilter">
              <feColorMatrix in="SourceGraphic"
              type="saturate"
              values="0" />
            </filter>


            {data.map((d, i) => {
              return (
                <pattern 
                  key={i}
                  id={`bar${i}`} 
                  patternUnits="objectBoundingBox" 
                  width="1"
                  height="1" 
                > 
                  <image 
                    x="0" 
                    y="0"
                    opacity={0.6}
                    filter="url(#pictureFilter)"
                    height={40} 
                    width={40}
                    xlinkHref={`https://www.nabuscadocandidato.com.br/static/img/candidates/${d.slug}.png`}
                  />
                </pattern>
              )
            })}
          </defs>
          <g
            transform={`translate(${this.cfg.margin.left}, ${this.cfg.margin.bottom})`}
          >
            <g
              className={css.axis}
              ref={(y) => { this.axisElement = y; }}
              strokeDasharray={2}
            />
            <g transform={`scale(1,-1) translate(${round === 2 ? ( this.cfg.width / 2 ) - ( 30 + 100 / 2 )  : 0}, -${h})`}>
              {data.map((d, i) => (
                <g  key={i} className={d.id}>
                  <rect
                    key={i}
                    x={round === 2 ? 100 * i : (this.cfg.width / data.length) * i}
                    y={0}
                    height={h - yScale(d.value)}
                    width={round === 2 ? 30 : this.cfg.rect}
                    fill={d.color}
                  >
                  </rect>
                  <circle
                    cx={ round === 2 ? (100 * i) + 30 / 2  : ( (this.cfg.width / data.length) * i ) + 20 / 2 }
                    cy={25}
                    transform={`scale(1,-1)`}
                    r={20}
                    fill={`url(#bar${i})`}
                  />
                </g>
              ))}
            </g>
          </g>
        </svg>
        
      </div>
    )
  }
}

export default Chart;

