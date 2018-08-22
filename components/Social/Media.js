import React from 'react';
import PropTypes from 'prop-types';

const Media = props => (
	<svg width="20px" height="20px" viewBox="0 0 20 20" className="exportSvg">
	  <path fill="none" stroke={props.stroke} d="M19.5,8V0.5H12"/>
	  <path fill="none" stroke={props.stroke} d="M19.6,0.4L6.2,14.6"/>
	  <path fill="none" stroke={props.stroke} d="M5.4,5.5H0.5v14h14v-4.9"/>
	</svg>
);

Media.propTypes = {
  children: PropTypes.node
};

Media.defaultProps = {
  children: null
};

export default Media;