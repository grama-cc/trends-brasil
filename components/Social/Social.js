import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';

import Media from './Media.js';
import Twitter from './Twitter.js';
import Facebook from './Facebook.js';
import Whatsapp from './Whatsapp.js';

const Social = props => (
  <div>
    {props.children}
    {/*className=props.share ? css.share : null*/}
    <ul className={css.social}>
      {!props.share ? <li><a href="#"><Media stroke={props.stroke} /></a></li> : null}
      <li><a href="#"><Twitter stroke={props.stroke} /></a></li>
      <li><a href="#"><Facebook stroke={props.stroke} /></a></li>
      <li><a href="#"><Whatsapp stroke={props.stroke} /></a></li>
    </ul>
  </div>
);

Social.propTypes = {
  children: PropTypes.node
};

Social.defaultProps = {
  children: null
};

export default Social;
