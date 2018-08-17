import React from 'react';
import css from './Footer.scss';
import Social from '../Social/Social.js';
import {i18n} from "../../common/locale/i18n";

class Footer extends React.Component {

  render() {
    return (
      <section className={css.footer}>
        <div className={css.container}>
          <div className={css.project}>
            <h2>{i18n('footer.project.title', null)}</h2>
            <div className={css.content}>
              <div>
                {i18n('footer.project.columnLeft', null).map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
              <div>
                {i18n('footer.project.columnRight', null).map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          </div>
          <div className={css.team}>
            <h2>{i18n('footer.team.title', null)}</h2>
            <ul>
              {i18n('footer.team.list', null).map((text, index) => (
                <li key={index}>
                  <h3>{text.title}</h3>
                  <a href={text.link}>
                    <p>{text.name}</p>
                  </a>
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













