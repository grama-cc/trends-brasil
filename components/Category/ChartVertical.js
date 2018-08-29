import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import css from './ChartVertical.scss'

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
    const h = this.cfg.height;
    const yScale = d3.scaleLinear()
      .domain([0, this.props.data.max_value])
      .range([this.cfg.width, this.cfg.margin.left]);

    return (
      <div className={css.container} type={this.props.type}>

        <p className={css.percent}>Porcentagem das categorias (%) entre as buscas feitas para cada candidato</p>

        <div className={css.content}>
          <svg
            className={css.chart}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${this.cfg.width + 95} ${h}`}
            preserveAspectRatio="none"
          >
            <g
              transform={`translate(110, 20)`}
            >
              <g
                className={css.axis}
                ref={(y) => { this.axisElement = y; }}
                transform={`translate(-45, 0)`}
              />
              <g 
                transform={`translate(-15, 0)`}
              >
                {this.props.data.values.map((d, i) => (
                  <g 
                    key={i}
                    transform={`translate(0, ${(this.cfg.height / this.props.data.values.length) * i})`}
                  >
                    <text
                      y={10}
                      x={-95}
                    >
                      {d.title}
                    </text>
                    <rect
                      y={0}
                      x={0}
                      width={this.cfg.width - yScale(d.value)}
                      height={this.cfg.rect}
                      fill={d.color}
                    >
                    </rect>
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

