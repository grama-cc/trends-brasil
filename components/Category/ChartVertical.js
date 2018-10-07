import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import css from './ChartVertical.scss'
import {i18n} from '../../common/locale/i18n';

class Chart extends React.Component { 

  constructor(props) {
    super(props);
    this.cfg = {
      width: 280,
      height: 600,
      rect: 15,
      margin: { top: 0, right: 0, bottom: 0, left: 30 },
      padding: 10,
    }
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const yScale = d3.scaleLinear()
      .domain([this.props.data.max_value, 0])
      .range([this.cfg.width, this.cfg.margin.left])

    const axisType = `axisTop`
    const axis = d3Axis[axisType]()
      .scale(yScale)
      .tickSize(-(this.cfg.height))
      .tickPadding([12])
      .ticks(4)
    d3.select(this.axisElement).call(axis)
  }

  render() {
    let data = this.props.data.values;
    const candidates = this.props.candidates;
    const round = this.props.round;

    const lang = this.props.lang;
    const h = round === 2 ? 300 : this.cfg.height;
    const yScale = d3.scaleLinear().domain([0, this.props.data.max_value]).range([this.cfg.width, this.cfg.margin.left]);

    if(round === 2) {
      data = data.filter((c) => candidates[0].id == c.id || candidates[1].id == c.id);
    }

    return (
      <div className={css.container} type={this.props.type}>
        <p className={css.percent}>{i18n('category.legend', lang)}</p>
        <div className={css.content}>
          <svg
            className={css.chart}
            viewBox={`0 0 ${this.cfg.width + 95} ${h - (data.length * 5)}`}
          >
            <g transform={`translate(110, 20)`}>
              <g
                className={css.axis}
                ref={(y) => { this.axisElement = y; }}
                transform={`translate(-45, 0)`}
              />
              <g transform={`translate(-15, ${round === 2 ? ( ( h / 2 ) - ( 30 + 80 / 2 ) )  : 0 })`}>
                {data.map((d, i) => (
                  <g 
                    key={i}
                    transform={`translate(0, ${round === 2 ? 80 * i : ( ( h / data.length ) - 5 ) * i})`}
                  >
                    <text y={round === 2 ? 18 : 10} x={-95}>{d.title}</text>
                    <rect
                      y={0}
                      x={0}
                      width={this.cfg.width - yScale(d.value)}
                      height={round === 2 ? 30 : this.cfg.rect}
                      fill={d.color}
                    />
                  </g>
                ))}
              </g>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

export default Chart;

