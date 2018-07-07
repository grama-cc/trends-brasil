import React from 'react';
import PropTypes from 'prop-types';

const Facebook = props => (

    <svg width="12px" height="21px" viewBox="0 0 12 21">
        <g stroke="none" fill="none">
            <g transform="translate(-177, -1002)">
                <g transform="translate(0, 450)">
                    <g transform="translate(82, 553)">
                        <g transform="translate(91, 0)">
                            <g>
                                <rect id="Rectangle-3-Copy-4" x="0" y="0" width="20" height="20"></rect>
                                <path d="M7.20313843,19.1004058 L11.1397525,19.1004058 L11.1397525,9.54863346 L14.1770623,9.54863346 L14.5502029,6.18448227 L11.1397525,6.18448227 L11.1397525,4.09238359 C11.1397525,3.34924125 11.448545,3.28332367 11.822078,3.28332367 L14.4980182,3.28332367 L14.4980182,0.0109862647 L11.3367205,0 C7.82621658,0 7.20313843,2.44012785 7.20313843,4.00213927 L7.20313843,6.18448227 L5,6.18448227 L5,9.54863346 L7.20313843,9.54863346 L7.20313843,19.1004058 Z" stroke="#B4B4B4" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

Facebook.propTypes = {
  children: PropTypes.node
};

Facebook.defaultProps = {
  children: null
};

export default Facebook;