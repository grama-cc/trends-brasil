import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';

class Cloud extends React.Component {
  render() {
    const words = this.props.words;
    return (
      <div {...this.props} className={css.cloud}>
        {words.map((words, idx) => (
          <div key={idx}>
            <a
              href={`https://www.google.com.br/search?q=${words.text.replace(/ /g,"+")}`}
              target="_blank"
              style={{
                fontSize: `calc(${words.size}% + 10px)`,
                color: this.props.color
              }}
            >
              {words.text}
            </a>
          </div>
        ))}
      </div>
    )
  }
}

export default Cloud;
