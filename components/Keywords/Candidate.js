import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import Media from "react-media";

import css from './Candidate.scss';
import Cloud from '../Cloud.js';

class Candidate extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      width: 0,
    }
    this.content = React.createRef();
  }

  onFilter = (e) => {
    const id = Number(e.currentTarget.dataset.id)
    this.props.onFilter(id)
  }

  onPrev = (e) => {
    const idx = Number(e.currentTarget.dataset.index);
    const candidates = this.props.candidates;

    if(idx > 0) {
      this.props.onFilter(candidates[idx - 1].id)
    }
  }

  onNext = (e) => {
    const idx = Number(e.currentTarget.dataset.index)
    const candidates = this.props.candidates;

    if(!idx) {
      this.props.onFilter(candidates[0].id)
    }

    if(idx < candidates.length - 1) {
      this.props.onFilter(candidates[idx + 1].id)
    }
  }

  findIndex = (array, attr, value) => {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return 0;
  }

  componentDidMount () {
    this.setState({ width: this.containerWidth() });
  }

  containerWidth = () => {
    const node = this.content.current.clientWidth;
    return node
  }


  render() {
    const candidates = this.props.candidates;
    const words = this.props.words;
    const content = this.props.content;
    const filter = this.props.filter

    const idx = !filter ? null : this.findIndex(candidates, 'id', filter);

    const list = 90

    const move = ( list * ( - idx ) );

    return (
      <div className={`${css.candidate}`} type={this.props.val}>

        <button 
          onClick={this.onPrev}
          data-index={idx}
          className={`${css.arrow} ${css.prev}`}
        />

        <div 
          className={`${css.content}`}
          ref={this.content}
        >
          <ul
            className={css.nav}
            style={{
              left: `${!filter ? move : move - list}px`,
              width: `${ (list * candidates.length) + list }px`
            }}
          >
            <li>
              <div
                className={css.image}
                style={{
                  backgroundImage: `url(/static/img/candidates/none.svg)`,
                  opacity: 1,
                  width: !filter ? '100%' : '60px',
                  height: !filter ? '100%' : '60px',
                }}
              />
            </li>
            {candidates.map((d, i) => {
              return (
                <li
                  key={i}
                  onClick={this.onFilter}
                  data-id={d.id}
                >
                  <div
                    className={css.image}
                    style={{
                      backgroundImage: `url(/static/img/candidates/${d.slug}.png)`,
                      backgroundColor: d.color,
                      opacity: filter === d.id ? 1 : .5,
                      width: filter === d.id ? '100%' : '60px',
                      height: filter === d.id ? '100%' : '60px',
                    }}
                  />
                </li>
              )
            })}
          </ul>

          <h3 className={css.title}>
            {!filter ? 'Clique em um candidato' : <span>{candidates[idx].name}</span>}
          </h3>

          <Cloud 
            id={!filter ? [] : candidates[idx].id} 
            candidates={candidates}
            words={words} 
            type='candidate'
            keywords
          />

        </div>

        <button
          onClick={this.onNext}
          data-index={idx}
          className={`${css.arrow} ${css.next}`}
        />
      </div>
    )
  }
}

export default Candidate;
