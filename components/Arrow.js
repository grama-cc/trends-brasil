import React from 'react';
import PropTypes from 'prop-types';

const Arrow = props => (
		<svg 
			version='1.1' 
			xmlns='http://www.w3.org/2000/svg' 
			preserveAspectRatio='none'
			viewBox='0 0 21 10' 
		>
			<path
				transform="translate(-162, -13)"
				fill='none'
				stroke={props.arrowColor}
				d="M162.3,13.4l10,9.1l10-9.1"
			/>
		</svg>
);

Arrow.propTypes = {
  children: PropTypes.node
};

Arrow.defaultProps = {
  children: null
};

export default Arrow;



