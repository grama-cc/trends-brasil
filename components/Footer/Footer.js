import React from 'react';
import PropTypes from 'prop-types';
import css from './Footer.scss';

import content from '../../static/json/footer.json';

import Project from './Project.js';
import Team from './Team.js';
import Social from '../Social/Social.js';
import Clipping from './Clipping.js';

class Footer extends React.Component {

  render() {
    return (
      <section className={css.footer} {...this.props}>
        <div className={css.footerContainer}>
            <div className={css.footerContent}>
                <Project />
                <Team />
            </div>
            <Social share>
                <h4>Compartilhe esse projeto</h4>
            </Social>
        </div>
        <Clipping />
      </section>
    );
  }
}

export default Footer;













