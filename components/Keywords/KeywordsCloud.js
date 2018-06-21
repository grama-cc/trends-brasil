import React from 'react';
import PropTypes from 'prop-types';
import css from './KeywordsCloud.scss';


class KeywordsCloud extends React.Component {

  render() {
    const words = this.props.words

    return (
      <div {...this.props} className={css.cloud}>
        {words.map((words, idx) => {
          return (
            <span
              key={idx}
              style={{fontSize: `${words.size}px`}}
            >
              {words.word}
            </span>
          )
        })}
      </div>
    )
  }
}

KeywordsCloud.propTypes = {
  children: PropTypes.node,
};

KeywordsCloud.defaultProps = {
  children: null,
};

export default KeywordsCloud;
