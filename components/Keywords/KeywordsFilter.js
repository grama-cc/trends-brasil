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
  }

  onChange = (e) => {
    const val = Number(e.target.value)
    this.setState({ 
      selected: val,
      active: !this.state.active
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

  renderGraphic = () => {

    return (
      this.props.data.map((data, idx) => {
        let diam = data.size * 10
        let radius = diam / 2

        let size = 300 // component width and height
        let padding = 20 // component padding
        let spacing = padding + radius

        let top = Math.floor( Math.random() * ( ( size - diam ) - spacing ) )
        let left = Math.floor( Math.random() * ( ( size - diam ) - spacing ) )
        
        let t = top < 0 ? 0 : top > 280 ? 280 : top
        let l = left < 0 ? 0 : left > 280 ? 280 : left

        return (
          <span
            key={idx}
            onClick={this.onSelect}
            data-id={data.id}
            style={{
              backgroundImage: `url(/static/img/candidates/${data.slug}.png)`,
              backgroundColor: data.color,
              width: `${diam}px`,
              height: `${diam}px`,
              opacity: this.state.current === data.id ? 1 : .5,
              top: `${t}px`,
              left: `${l}px`,
            }}
          />
        )
      })
    )
  }

  renderCandidate = () => {
    return (
      <ul className={css.filter}>
        <li> Escolha um candidato </li>
        {this.props.data.map((data, idx) => {
          return (
            <li key={idx} data-id={data.id} onClick={this.onSelect}>
              {data.name}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const data = this.props.data
    const current = this.state.current
    const selected = this.state.selected

    return (
      <div>

        <div className={css.selected}>
          <button value='1' onClick={this.onChange} className={selected === 1 ? css.disabled : null}>Gráfico</button>
          <button value='2' onClick={this.onChange} className={selected === 2 ? css.disabled : null}>Candidato</button>
        </div>

        <div className={css.content}>
          {selected === 1 ? <div className={css.graphic}>{this.renderGraphic()}</div> : selected === 2 ? <div className={css.candidate}>{this.renderCandidate()}</div> : null}
        </div>

        <div>
          Modal
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
