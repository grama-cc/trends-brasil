import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';

class Cloud extends React.Component {

  render() {
    const words = this.props.words

    return (
      <div {...this.props} className={css.cloud}>
        {words.map((words, idx) => (
          <div key={idx}>
            <span
              style={{
                fontSize: `calc(${words.size}% + 10px)`,
                color: this.props.color
              }}
            >
              {words.text}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

export default Cloud;
