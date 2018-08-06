import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';

import Media from './Media.js';
import Twitter from './Twitter.js';
import Facebook from './Facebook.js';
import Whatsapp from './Whatsapp.js';

const Social = props => (
  <React.Fragment>
    {props.children}
    <ul className={`${css.social} ${props.bottom ? css.bottom : null} ${props.share ? css.share : null}`}>
      {!props.share ? <li><a href="#"><Media stroke={props.stroke} /></a></li> : null}
      <li><a href="#"><Twitter stroke={props.stroke} /></a></li>
      <li><a href="#"><Facebook stroke={props.stroke} /></a></li>
      <li><a href="#"><Whatsapp stroke={props.stroke} /></a></li>
    </ul>
  </React.Fragment>
);

Social.propTypes = {
  children: PropTypes.node
};

Social.defaultProps = {
  children: null
};

export default Social;
