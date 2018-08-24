import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import css from './Chart.scss'

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

    return (
      <div className={css.container} type={this.props.type}>
        <p className={css.percent}>Porcentagem das categorias (%) entre as buscas feitas para cada candidato</p>
        <svg
          className={css.chart}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.cfg.width} ${h}`}
          preserveAspectRatio="none"
          style={{
            padding: `${this.cfg.padding}px`
          }}
        >
          <g
            transform={`translate(${this.cfg.margin.left}, ${this.cfg.margin.bottom})`}
          >
            <g
              className={css.axis}
              ref={(y) => { this.axisElement = y; }}
            />
            <g transform={`scale(1,-1) translate(0, -${h})`}>
              {this.props.data.values.map((d, i) => (
                <rect
                  key={i}
                  x={(this.cfg.width / this.props.data.values.length) * i}
                  y={0}
                  height={h - yScale(d.value)}
                  width={this.cfg.rect}
                  fill={d.color}
                >
                </rect>
              ))}
            </g>
          </g>
        </svg>

        <ul className={css.list}>
          {this.props.data.values.map((d, i) => {
            return (
              <li key={i}>
                <img src={`/static/img/candidates/${d.slug}.png`} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Chart;

