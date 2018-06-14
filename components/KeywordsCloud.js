import React from 'react';
import PropTypes from 'prop-types';
import css from './KeywordsCloud.scss';


class KeywordsCloud extends React.Component {

  render() {
    return (
      <div>
        {this.props.words.map((words, idx) => {
          return (
            <span>
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
