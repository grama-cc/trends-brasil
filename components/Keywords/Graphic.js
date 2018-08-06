import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import Media from "react-media";
import css from './Graphic.scss';
import * as d3 from "d3";
import Api from '../../lib/Api';

class Graphic extends React.Component {

  constructor (props) {
    super(props)
    this.config = {
      width: 300,
      height: 300,
      padding: 20
    }
  }

  onFilter = (e) => {
    const id = Number(e.currentTarget.dataset.id)
    this.props.onFilter(id)
  }

  closeModal = () => {
    this.props.onFilter()
  }

  renderModalWords () {
    const candidates = this.props.candidates.filter((c) => this.props.filter === c.id);
    const words = candidates[0].words.slice(0, 8);
    const name = candidates[0].name;

    return (
      <div className={css.modal} onClick={this.closeModal}>
        <h3>{name}</h3>
        {words.map((word, index) => (
          <p key={index}>
            <a
              href={`https://www.google.com.br/search?q=${word.query_text.replace(/ /g,"+")}`}
              target={`_blank`}
              style={{
                color: word.color,
              }}
            >
              {word.text}
            </a>
          </p>
        ))}
      </div> 
    )
  }

  render () {
    const data = this.props.candidates;
    const filter = this.props.filter;

    const children = {'children': data.map((d) => (d))};
    const bubble = d3.pack(children).size([this.config.width, this.config.height]).padding(this.config.padding); 
    const nodes = d3.hierarchy(children).sum(function(d) { return d.size; });

    let circles = bubble(nodes).leaves();

    circles = circles.sort((a, b) => {
      if (a.data.id === filter) {
        return 1;
      }
      if (b.data.id === filter) {
        return -1;
      }
      return 0;
    })


    return(
      <div 
        className={css.graphic}
        type={this.props.val}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.config.width} ${this.config.height}`}
          preserveAspectRatio="none"
        >
          <defs>
            {circles.map((c, idx) => {
              return (
                <pattern 
                  key={idx}
                  id={`img${idx}`} 
                  patternUnits="objectBoundingBox" 
                  width="1"
                  height="1" 
                  patternUnits="objectBoundingBox"
                > 
                  <rect height="100%" width="100%" fill={c.data.color} />
                  <image 
                    x="0" 
                    y="0" 
                    height={c.r === 0 ? 20 : c.r * 2} 
                    width={c.r === 0 ? 20 : c.r * 2}
                    xlinkHref={`/static/img/candidates/${c.data.slug}.png`}
                    className={filter === c.data.id ? css.openImage : null}
                  />
                </pattern>
              )
            })}
          </defs>

          {circles.map((c, idx) => {
            return (
              <g
                key={idx}
                transform={`translate(${c.x}, ${c.y})`}
                onClick={this.onFilter}
                data-id={c.data.id}
                opacity={filter === c.data.id ? 1 : .4}
                className={filter === c.data.id ? css.open : null}
              >
                <circle
                  r={c.r === 0 ? 10 : c.r}
                  fill={`url(#img${idx})`}
                />
              </g>
            )
          })}
        </svg>

        {this.props.filter ? this.renderModalWords() : null}

      </div>
    )
  }
}
export default Graphic;
