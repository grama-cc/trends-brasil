import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';


const Social = props => (
  <div className={props.share ? css.share : null}>
    {props.children}
    <ul className={css.social}>
      {!props.share ? <li><a href="#"><img src="/static/img/media.svg"/></a></li> : null}
      <li><a href="#"><img src="/static/img/twitter.svg"/></a></li>
      <li><a href="#"><img src="/static/img/facebook.svg"/></a></li>
      <li><a href="#"><img src="/static/img/whatsapp.svg"/></a></li>
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
