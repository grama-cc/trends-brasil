import React from 'react';
import PropTypes from 'prop-types';
import css from './Clipping.scss';

import content from '../../static/json/footer.json';

class Clipping extends React.Component {
  render() {
    return (
      <section className={css.clipping}>
        <ul>
          {content.clipping.list.map((item, index) => (
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
