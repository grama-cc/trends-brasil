import React from 'react';
import css from './Clipping.scss';
import {i18n} from "../../common/locale/i18n";


class Clipping extends React.Component {

  render() {
    const lang = this.props.lang

    return (
      <section className={css.clipping}>
        <ul>
          {i18n('footer.clipping.list', lang).map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <a href={item.link} target="_blank">{item.link}</a>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

export default Clipping;
