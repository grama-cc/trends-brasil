import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './KeywordsFilter.scss';

import KeywordsCloud from './KeywordsCloud.js';

class KeywordsFilter extends React.Component {

  // save only current item index
  constructor (props) {
    super(props)
    this.settings = {
      dots: true,
      infinite: false,
      speed: 500,
      //slidesToShow: 1,
      //slidesToScroll: 1,
      arrows: true
    }
    this.state = {
      current: null,
      selected: 1,
      active: false,
      index: null
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
    const index = e.currentTarget.dataset.index
    const id = Number(e.currentTarget.dataset.id)
    this.setState({ 
      current: id,
      index: index
    })
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

  // Make function return only itens 
  renderGraphic = () => {
    return (
      this.props.data.map((data, idx) => {
        let diam = data.size * 10
        let radius = diam / 2

        let size = 300 // component width and height
        let padding = 20 // component padding
        let spacing = padding + radius

        // Make if / else
        let top = Math.floor( Math.random() * ( ( size - diam ) - spacing ) )
        let left = Math.floor( Math.random() * ( ( size - diam ) - spacing ) )
        
        let t = top < 0 ? 0 : top > 280 ? 280 : top
        let l = left < 0 ? 0 : left > 280 ? 280 : left

        // console.log(data)

        return (
          <span
            key={idx}
            onClick={this.onSelect}
            data-index={idx}
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

  // Make function return only itens 
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

    const candidate = this.state.index ? data[this.state.index] : []

    return (
      <div>

        <div className={css.selected}>
          <button value='1' onClick={this.onChange} className={selected === 1 ? css.disabled : null}>Gráfico</button>
          <button value='2' onClick={this.onChange} className={selected === 2 ? css.disabled : null}>Candidato</button>
        </div>

        <div className={css.content}>
          {selected === 1 ? <div className={css.graphic}>{this.renderGraphic()}</div> : selected === 2 ? <div className={css.candidate}>{this.renderCandidate()}</div> : null}
        </div>


        <div
          className={this.state.index ? `${css.modal} ${css.open}` : `${css.modal}` }
        >
          <p>{candidate.name}</p>
          <p>{candidate.slug}</p>
          {candidate.words ? candidate.words.map((word, index) => {
            return <p key='index'>{word.word}</p>
          }) : null}
        </div>


        {/*<Slider {...this.settings}>
          {data.map((d, i) => {
            return <div key={i}>{d.name}</div>
          })}
        </Slider>*/}
        {/*this.state.current ? <KeywordsCloud words={this.getWords()} /> : null*/}
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
