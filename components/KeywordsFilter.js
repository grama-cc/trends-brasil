import React from 'react';
import PropTypes from 'prop-types';
import css from './KeywordsFilter.scss';

import KeywordsCloud from './KeywordsCloud.js';

class KeywordsFilter extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      current: null
    }
  }

  onSelect = (id) => {
    this.setState({ current: id })
  }

  renderCloud() {
    {this.props.data.map((data) => {
      //return (
        <KeywordsCloud key={data.id} words={this.state.current == data.id ? data.words : []} />
     // )
    })}
  }

  render() {
    return (
      <div className={css.temp + ' ' + css.taina}>
        <ul className={css.filter}>
          <li> Escolha um candidato </li>
          {this.props.data.map((data) => {
            return (
              <li key={data.id} onClick={this.onSelect.bind(this, data.id)} >
                {data.name}
              </li>
            )
          })}
        </ul>

        {this.renderCloud()}

      </div>
    )
  }
}

KeywordsFilter.propTypes = {
  children: PropTypes.node,
};

KeywordsFilter.defaultProps = {
  children: null,
};

export default KeywordsFilter;
