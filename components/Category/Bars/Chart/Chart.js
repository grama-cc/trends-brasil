import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import data from '../data'

class Chart extends React.Component { 

  constructor(props) {
    super(props);
    this.config = {
      width: 800,
      height: 500,
      margins: { top: 50, right: 10, bottom: 100, left: 50 }
    }

    this.colorScale = d3.scaleLinear()
      .domain([0, 100])
      .range(['#F3E5F5', '#7B1FA2'])
  }

  componentDidMount() {
    this.renderAxisX()
    this.renderAxisY()
  }

  componentDidUpdate() {
    this.renderAxisX()
    this.renderAxisY()
  }

  renderAxisX() {

    const xScale = d3.scaleBand()
      .padding(0.5)
      .domain(data.map(d => d.title))
      .range([this.config.margins.left, this.config.width - this.config.margins.right])
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([this.config.height - this.config.margins.bottom, this.config.margins.top])

    const axisType = `axisBottom`
    const axis = d3Axis[axisType]()
      .scale(xScale)
      .tickSize(0)
      .tickPadding([12])
      .ticks([4])

    d3.select(this.axisElementX).call(axis)
  }

  renderAxisY() {

    const xScale = d3.scaleBand()
      .padding(0.5)
      .domain(data.map(d => d.title))
      .range([this.config.margins.left, this.config.width - this.config.margins.right])
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([this.config.height - this.config.margins.bottom, this.config.margins.top])



    const axisType = `axisLeft`
    const axis = d3Axis[axisType]()
      .scale(yScale)
      .tickSize(-(this.config.width - this.config.margins.left - this.config.margins.right))
      .tickPadding([12])
      .ticks([4])

    d3.select(this.axisElementY).call(axis)
  }

  render() {
    const margins = { top: 50, right: 10, bottom: 100, left: 50 }

    const svgDimensions = {
      width: 800,
      height: 500
    }

    const xScale = d3.scaleBand()
      .padding(0.5)
      .domain(data.map(d => d.title))
      .range([this.config.margins.left, this.config.width - this.config.margins.right])
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([this.config.height - this.config.margins.bottom, this.config.margins.top])

    return (
      <svg width={this.config.width} height={this.config.height}>

        <g>
          <g
            ref={(x) => { this.axisElementX = x; }}
            transform={`translate(0, ${this.config.height - margins.bottom})`}
          />
          <g
            ref={(y) => { this.axisElementY = y; }}
            transform={`translate(${margins.left}, 0)`}
          />
        </g>

    <g>
    {data.map((datum, i) => (
        <rect
          key={i}
          x={xScale(datum.title)}
          y={yScale(datum.value)}
          height={this.config.height - this.config.margins.bottom - yScale(datum.value)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.value)}
        />
    ))}
    </g>
      </svg>
    )
  }
}

export default Chart;

