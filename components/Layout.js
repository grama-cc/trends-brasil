import React from 'react';
import PropTypes from 'prop-types';

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
