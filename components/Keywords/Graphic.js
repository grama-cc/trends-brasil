import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import css from './Graphic.scss';
import * as d3 from "d3";
import Api from '../../lib/Api';

class Graphic extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      id: null,
      active: false,
      word: null,
      //index: null
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const word = await Api.get('/word.json');
    this.setState({ word });
  }

  onSelect = (e) => {
    this.setState({ 
      //id: Number(e.currentTarget.dataset.id),
      active: true,
      //index: Number(e.currentTarget.dataset.index),
    });
    const val = Number(e.currentTarget.dataset.id)
    this.props.click(val)
  }

  closeModal = () => {
    this.setState({ active: false });
  }

  getWords () {
    const words = this.state.word.filter((w) => { 
      return this.props.id == w.candidate;
    });

    const slice_array = words.slice(0, 8);
    return slice_array
  }

  renderModalWords () {
    const words = this.getWords();

    const name = this.props.data.map((d) => {
      if (this.props.id === d.id) {
        return d.name
      }
    })

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

    // fazer um func
    const children = {'children': data.map((d) => (d))};

    const diameterw = window.innerWidth < 800 ? window.innerWidth - 35 : window.innerWidth / 1.7; //responsivo
    const diameterh = window.innerWidth < 800 ? window.innerWidth - 35 : (window.innerWidth / 1.7) * 2/3; //responsivo

    const pad = diameterw < 800 ? 5 : 10
    const bubble = d3.pack(children).size([diameterw, diameterh]).padding(pad); 

    const nodes = d3.hierarchy(children).sum(function(d) { return d.size; });

    let circles = bubble(nodes).leaves();

    circles = circles.sort((a, b) => {
      if (a.data.id === this.props.id || b.data.id === this.props.id) {
        return 1;
      }
        return 0;
    })

    return(
      <div className={this.props.val === 1 ? css.graphic : `${css.none} ${css.graphic}`}>

        <svg width={diameterw} height={diameterh}>

          <defs>
            {circles.map((c, idx) => {
              return (
                <pattern 
                key={idx}
                  id={`img${idx}`} 
                  patternUnits="objectBoundingBox" 
                  width="1" height="1" 
                  //height={c.r} width={c.r}
                  patternUnits="objectBoundingBox"
                  > 
                  <rect height="100%" width="100%" fill={c.data.color}/>
                  <image 
                 x="0" y="0" 
                  //x={c.x}
                  //y={c.y}
                  height={this.props.id === c.data.id && this.state.active ? 100 : c.r * 2} 
                  width={this.props.id === c.data.id && this.state.active ? 100 : c.r * 2}
                  //width="152" height="152" 
                  xlinkHref={`/static/img/candidates/${c.data.slug}.png`}></image>
                </pattern>
              )
            })}
          </defs>

          {circles.map((c, idx) => {
            const id = this.props.id
            return (
              <g
                key={idx}
                transform={`translate(${diameterw < 800 ? (c.x * 1.22) - diameterw / 9 : (c.x * 1.5) - diameterw / 3.5}, ${c.y})`}
                onClick={this.onSelect}
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
        {this.state.active ? this.renderModalWords() : null}
      </div>
    )
  }
}
export default Graphic;
