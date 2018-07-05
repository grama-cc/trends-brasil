import React from 'react';
import PropTypes from 'prop-types';

const Media = props => (

<svg width="20px" height="20px" viewBox="0 0 20 20" xmlSpace="preserve">
    <g transform="translate(-82, -1003)">
        <g transform="translate(0, 450)">
            <g transform="translate(82, 553)">
                <g>
                    <g>
                        <rect fill="none" width="20" height="20"/>
                        <path fill="none" stroke="#B4B4B4" d="M5.4,5.5H0.5v14h14v-4.9"/>
                        <path fill="none" stroke="#B4B4B4" d="M19.5,8V0.5H12"/>
                        <path fill="none" stroke="#B4B4B4" d="M19.6,0.4L6.2,14.6"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>

);

Media.propTypes = {
  children: PropTypes.node
};

Media.defaultProps = {
  children: null
};

export default Media;