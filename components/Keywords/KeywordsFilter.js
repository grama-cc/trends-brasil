import React from 'react';
import PropTypes from 'prop-types';

import css from './KeywordsFilter.scss';
import KeywordsCloud from './KeywordsCloud.js';

class KeywordsFilter extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      current: null,
      selected: 1,
      active: false
    }
    this.onSelect = this.onSelect.bind(this);
  }

  onChange = (e) => {
    const val = Number(e.target.value)
    this.setState({ 
      selected: val,
      active: true
    })
  }

  onSelect = (e) => {
    const id = Number(e.currentTarget.dataset.id)
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

  render() {
    const data = this.props.data
    const current = this.state.current

    return (
      <div className={css.temp}>

        <div className={css.btn}>
          <button
            value='1'
            onMouseEnter={this.onChange}
          >
            Gráfico
          </button>
          <button
            value='2'
            onClick={this.onChange}
          >
            Candidato
          </button>
        </div>

        <div>
          {this.state.selected === 1 ? <div className={css.candidate}>
            {this.props.data.map((data, idx) => {
              const size = data.size * 10
              return (
                <span
                  key={idx}
                  onClick={this.onSelect}
                  data-id={data.id}
                  style={{
                    backgroundColor: data.color,
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: this.state.current === data.id ? 1 : .5,
                    // top: `${(size / 2) + idx * 10}px`,
                    // left: `${(size / 2) + idx * 10}px`,
                  }}
                >
                </span>
              )
            })}
          </div> : null }


          {this.state.selected === 2 ? <ul className={css.filter}>
            <li> Escolha um candidato </li>
            {data.map((data, idx) => {
              return (
                <li key={idx} data-id={data.id} onClick={this.onSelect}>
                  {data.name}
                </li>
              )
            })}
          </ul> : null }
        </div>

        {this.state.current ? <KeywordsCloud words={this.getWords()} /> : null}
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
