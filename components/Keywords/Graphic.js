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
    this.state = {
      id: null,
      active: false,
    }
  }

  onSelect = (e) => {
    this.setState({ active: true });
    const val = Number(e.currentTarget.dataset.id)
    this.props.click(val)
    // console.log('select')
  }

  onClick = (e) => {
    // this.setState({ active: true });
    const val = Number(e.currentTarget.dataset.id)
    this.props.click(val)
    // console.log('click', val)
  }

  closeModal = () => {
    this.setState({ active: false });
  }

  getWords () {
    const data = this.props.data.filter((candidate) => { 
      return this.props.id === candidate.id
    });
    const slice_array = data[0].words.slice(0, 8);
    return slice_array
  }

  renderModalWords () {
    const words = this.getWords();
    const name = this.props.data.map((d) => {
      if (this.props.id === d.id) {
        return d.name
      }
    });
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
                fontSize: `14px`,
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
    const data = this.props.data;
    const id = this.props.id;

    let diameterw = window.innerWidth - 35;
    let diameterh = diameterw;
    let pad = 5;
    let h;

    if(window.innerWidth > 800) {
      diameterw = window.innerWidth/1.6;
      h = (diameterw * 2/3) * 1/10;
      diameterh = diameterw * 2/3 + h;
      pad = 10;
    }

    // console.log(diameterw, diameterh, h)

    const children = {'children': data.map((d) => (d))};
    //const bubble = d3.pack(children).size([1180, 860]).padding(pad);
    const bubble = d3.pack(children).size([diameterw, diameterh]).padding(pad); 
    const nodes = d3.hierarchy(children).sum(function(d) { return d.size; });
    let circles = bubble(nodes).leaves();

    // console.log(circles)

    circles = circles.sort((a) => {
      if (a.data.id === id) {
        return 1;
      }
        return 0;
    })

    return(
      <div className={this.props.val === 1 ? css.graphic : `${css.none} ${css.graphic}`}>

        <svg width='100%' height={diameterh}>
          <defs>
            {circles.map((c, idx) => {
              return (
                <pattern 
                  key={idx}
                  id={`img${idx}`} 
                  patternUnits="objectBoundingBox" 
                  width="1" height="1" 
                  patternUnits="objectBoundingBox"
                > 
                  <rect height="100%" width="100%" fill={c.data.color} />
                  <image 
                    x="0" 
                    y="0" 
                    height={this.props.id === c.data.id && this.state.active ? 100 : c.r * 2} 
                    width={this.props.id === c.data.id && this.state.active ? 100 : c.r * 2}
                    xlinkHref={`/static/img/candidates/${c.data.slug}.png`}
                  />
                </pattern>
              )
            })}
          </defs>

          {circles.map((c, idx) => {
            const x = diameterw < 750 ? (c.x * 1.2) - diameterw/20 : (c.x * 1.5) - diameterw/3.5;
            const y = c.y;
            return (
              <g
                key={idx}
                transform={`translate(${x}, ${y})`}
                onClick={diameterw < 750 ? this.onSelect : this.onClick}
                data-id={c.data.id}
                opacity={id === c.data.id ? 1 : .4}
                className={id === c.data.id && this.state.active ? css.open : null}
              >
                <circle
                  r={c.r}
                  fill={`url(#img${idx})`}
                />
              </g>
            )
          })}
          
        </svg>
        <Media query="(max-width: 800px)">
          {matches => matches && this.state.active ? this.renderModalWords() : null}
        </Media>
      </div>
    )
  }
}
export default Graphic;
