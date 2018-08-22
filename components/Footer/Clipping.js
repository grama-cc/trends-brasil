import React from 'react';
import css from './Clipping.scss';
import {i18n} from "../../common/locale/i18n";


class Clipping extends React.Component {
  render() {
    return (
      <section className={css.clipping}>
        <ul>
          {i18n('footer.clipping.list', null).map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

export default Clipping;
