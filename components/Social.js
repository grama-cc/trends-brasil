import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';

class Social extends React.Component {
  render() {
    return (
      <ul className={css.social}>
        <li><a href="javascript:void(0)"><img src="/static/img/media.svg"/></a></li>
        <li><a href="javascript:void(0)"><img src="/static/img/twitter.svg"/></a></li>
        <li><a href="javascript:void(0)"><img src="/static/img/facebook.svg"/></a></li>
        <li><a href="javascript:void(0)"><img src="/static/img/whatsapp.svg"/></a></li>
      </ul>
    )
  }
}

Social.propTypes = {
  content: PropTypes.object
};

Social.defaultProps = {
  content: {}
};

export default Social;
