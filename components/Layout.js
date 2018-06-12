import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../routes';

import css from './Layout.scss';

const Layout = props => (
  <React.Fragment>
    <nav className={css.nav}>
      <Link route="/">
        <a className={css.link}>Home</a>
      </Link>
      <Link route="/single/123">
        <a className={css.link}>Single</a>
      </Link>
      <Link route="/login">
        <a className={css.link}>Login</a>
      </Link>
    </nav>
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
