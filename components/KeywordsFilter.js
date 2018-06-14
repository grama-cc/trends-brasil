import React from 'react';
import PropTypes from 'prop-types';

import css from './KeywordsFilter.scss';
import k from './KeywordsCandidate.scss';

import KeywordsCloud from './KeywordsCloud.js';
//import KeywordsCandidate from './KeywordsCandidate.js';

class KeywordsFilter extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      current: null
    }
  }

  onSelect = (event) => {
    const id = Number(event.currentTarget.dataset.id)
    this.setState({ current: id })
  }

  getCandidate = () => {
    const data = this.props.data
    let id = this.state.current
    let filter = data.filter( f => (f.id == id) )
    let person = filter.reduce((acc, cur, i) => {
     acc[i] = cur
      return acc
    })
    return person
  }

  getWords = () => {
    const data = this.getCandidate()
    let words = data.words
    return words
  }

  renderCandidates() {
    return (
      <div className={k.candidate}>
        {this.props.data.map((data, idx) => {
          return (
            <span 
              key={idx}
              onClick={this.onSelect}
              data-id={data.id}
              style={{
                backgroundColor: data.color,
                width: `${data.size}px`,
                height: `${data.size}px`,
                opacity: this.state.current === data.id ? 1 : .3
              }}
            >
            </span>
          )
        })}
      </div>
    )
  }

  render() {
    const data = this.props.data
    const current = this.state.current
    return (
      <div className={css.temp}>
        <ul className={css.filter}>
          <li> Escolha um candidato </li>
          {data.map((data, idx) => {
            return (
              <li key={idx} data-id={data.id} onClick={this.onSelect}>
                {data.name}
              </li>
            )
          })}
        </ul>

        {this.state.current ? <KeywordsCloud words={this.getWords()} /> : null}

        {this.renderCandidates()}

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
