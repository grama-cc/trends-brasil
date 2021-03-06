import React from 'react';
import css from './Graphic.scss';
import * as d3 from "d3";
import {i18n} from "../../common/locale/i18n";

class Graphic extends React.Component {

  constructor (props) {
    super(props)
    this.config = {
      width: 270,
      height: 270,
      padding: 30
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

    if(!this.props.candidates || !this.props.words) {

      return <div className={css.loading} />

    }

    let candidate = this.props.candidates.filter((c) => this.props.filter === c.id);
    
    let words = this.props.words.filter((c) => this.props.filter === c.candidate);
    words = words.slice(0, 8);

    return (
      <div className={css.modal} onClick={this.closeModal}>
        <button>
          <svg 
            width="18px" 
            height="18px" 
            viewBox="0 0 18 18" 
          >
            <g 
              stroke="#4a4a4a"
              strokeWidth="1"
              fill="none"
            >
              <path d="M16.2273888,0 L0,16.2273888" />
              <path d="M0,0 L16.2273888,16.2273888" />
            </g>
          </svg>
        </button>
        <h3>{candidate[0].name}</h3>
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
    let data = this.props.candidates;
    let filter = this.props.filter;

    /*if(this.props.round === 2) {
      data = data.filter((c) => c.second_round);
    }*/

    const children = {'children': data.map((d) => (d))};

    const bubble = d3.pack(children).size([this.config.width, this.config.height]).padding(this.config.padding); 
    
    const nodes = d3.hierarchy(children).sum(function(d) { return d.size; });

    const lang = this.props.lang;

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
        >
          <defs>
            <text>{i18n('keywords.title', lang)}</text>
            <text className='description'>
              {i18n('keywords.description', lang)}
              {i18n('keywords.highlight', lang)}
            </text>
            <text className='more'>
              {i18n('keywords.button', lang)} - {i18n('keywords.more', lang)}
            </text>
            {circles.map((c, idx) => {
              const size = c.r < 10 ? 20 : filter === c.data.id && c.r === 50 ? 100 : c.r * 2
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
                    height={size} 
                    width={size}
                    xlinkHref={`./static/img/candidates/${c.data.slug}.png`}
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
                  r={c.r < 10 ? 10 : c.r}
                  fill={`url(#img${idx})`}
                />
              </g>
            )
          })}
        </svg>

        {!filter ? null : this.renderModalWords()}

      </div>
    )
  }
}
export default Graphic;
