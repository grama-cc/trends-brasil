import React from 'react';
import PropTypes from 'prop-types';
import css from './Layout.scss';

const Layout = props => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
