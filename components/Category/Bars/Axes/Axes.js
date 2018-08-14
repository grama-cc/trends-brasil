import React from 'react';
import PropTypes from 'prop-types';

import Axis from '../Axis'

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: 0,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}

// export { default } from './Axes'
