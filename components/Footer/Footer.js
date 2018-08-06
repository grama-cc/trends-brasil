import React from 'react';
import PropTypes from 'prop-types';

import css from './Footer.scss';
import content from '../../static/json/footer.json';

import Social from '../Social/Social.js';
import Clipping from './Clipping.js';

class Footer extends React.Component {

  render() {
    return (
      <section className={css.footer}>
        <div className={css.container}>
          <div className={css.project}>
            <h2>{content.project.title}</h2>
            <div className={css.content}>
              <div>
                {content.project.columnLeft.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
              <div>
                {content.project.columnRight.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          </div>
          <div className={css.team}>
            <h2>{content.team.title}</h2>
            <ul>
              {content.team.list.map((text, index) => (
                <li key={index}>
                  <h3>{text.title}</h3>
                  <p>{text.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={css.socialContainer}>
          <Social share stroke="#4b4b4b">
            <h4>Compartilhe esse projeto</h4>
          </Social>
        </div>
        
      </section>
    );
  }
}

export default Footer;













