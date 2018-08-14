import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";

import data from '../data'
import Axes from '../Axes'
import Bars from '../Bars'

class Chart extends React.Component { 

  constructor(props) {
    super(props);
    this.config = {
      width: 800,
      height: 500,
      margins: { top: 50, right: 10, bottom: 100, left: 50 }
    }
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
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={100}
          svgDimensions={svgDimensions}
        />
      </svg>
    )
  }
}

export default Chart;

