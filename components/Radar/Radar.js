import React from 'react';
import PropTypes from 'prop-types';
import css from './Radar.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/keywords.json'

import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class RadarChart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      radar: null,
      candidate: null,
      id: null,
    };

    this.config = {
      width: 270, // fazer o responsivo
      height: 270, // fazer o responsivo
      margin: { 
        top: 100,
        right: 100,
        bottom: 100,
        left: 100 
      },
      dash: 1,
      levels: 1,
      padding: 1.3,
      labelsCirles: 1.2, // circle label distance
      maxValue: 0.5, // biggest circle will value
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  getData = async () => {
    const radar = await Api.getRadar();
    const candidate = await Api.getCandidates();
    this.setState({ radar, candidate });
  }

  componentDidMount() {
    this.getData();

    const width = window.innerWidth / 2;
    const circle = width / 2;

    if(window.innerWidth > 500) {

      this.config.dash = 2;
      this.config.width = window.innerWidth / 2;
      this.config.height = this.config.width * 0.80;
      this.radius = Math.min(circle, circle * 0.70);

    } else {

    }
  }

  values = (data) => {
    const max = Math.max(this.config.maxValue, d3.max(data,
      ((array) => (
        d3.max(array.categories.map(
          (item) => ( item.percent / 100 )
        ))
      )))
    );
    const scale = d3.scaleLinear().range([0, this.radius]).domain([0, max]);
    const angles = Math.PI * 2 / 6;
    return {
      "max": max,
      "scale": scale,
      "angles": angles,
    }
  }

  circleLevels = () => {
    const levels = d3.range(1, (this.config.levels + 1) );
    const diameter = levels.map((d, i) => {
      return this.radius / this.config.levels * d
    });
    return diameter
  }

  axisPosition = (data) => {
    const values = this.values(data)
    const position = data[0].categories.map((d, i) => {

      console.log(Math.sin( values.angles * i - Math.PI / 2 ))
      return {
        "name": d.name,
        "x": values.scale( values.max ) * Math.sin( values.angles * i - Math.PI / 2 ), 
        "y": values.scale( values.max ) * Math.cos( values.angles * i - Math.PI / 2 )
      }
    });

    console.log(position)
    return position
  }

  findIndex = (array, attr, value) => {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return 0;
  }

  render() {
    if (!this.state.radar && !this.state.candidate) {
      return <div className={css.loading}>Loading...</div>
    }

    const data = {
      'candidate': this.state.candidate,
      'radar': this.state.radar
    }

    let radar = data.radar;

    const circles = this.circleLevels();
    const axis = this.axisPosition(radar);
    const values = this.values(radar)
    const radarLine =  d3.radialLine().curve( d3.curveCardinalClosed ).radius(( d ) => ( 
      values.scale( (d.percent ) / 100 ) )).angle(( d, i ) => ( i * values.angles )
    );

    const filter = this.props.filter;
    const w = this.config.width;
    const h = this.config.height;

    radar = radar.sort((a) => {
      if (a.id === filter) {
        return 1;
      }
      return 0;
    })

    return (
      <section
        className={css.radar}
        style={{
          backgroundColor: filter === 0 ? '#b4b4b4' : radar[radar.length - 1].color
        }}
      >
        <div className={css.container}>

          <div className={css.info}>
            <Description content={content.description} />

            <ul className={css.slider}>
              {data.candidate.map((c, idx) => (
                <li 
                  key={idx}
                  value={c.id}
                  data-name={c.name}
                  style={{
                    display: filter == c.id ? 'block' : 'none'
                  }}
                >
                  <img src={`/static/img/busto/${c.slug}.png`} alt={`c.slug`} />
                  <h3>{c.name}</h3>
                </li>
              ))}
            </ul>

          </div>

          <div className={css.radarContainer}>
            <Filter 
              {...this.props}
              data={data.candidate} 
              open 
            />

            <svg width={w} height={h}>
              <g transform={`translate(${w / 2}, ${h / 2})`}>
                
                <defs>
                  <radialGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="20%" 
                      style={{ 
                        stopColor: this.props.filter === 0 ? '#b4b4b4' : radar[radar.length - 1].color, 
                        stopOpacity: 0.1 
                      }} 
                    />
                    <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 0.5 }} />
                  </radialGradient>
                </defs>

                <g>
                  {circles.map((diameter, idx) => (
                    <circle
                      key={idx}
                      className={css.grid}
                      fill="none"
                      stroke="#fff"
                      strokeDasharray={this.config.dash}
                      r={diameter}
                    />
                  ))}

                  {axis.map((point, idx) => (
                    <g key={idx}>
                      <line
                        stroke="#fff"
                        strokeDasharray={this.config.dash}
                        className={css.axis}
                        x1={0}
                        y1={0}
                        x2={point.x}
                        y2={point.y}
                      />
                      <text
                        className={css.text}
                        textAnchor={`middle`}
                        dy={`0.35em`}
                        x={point.x * 1.2}
                        y={point.y * 1.2}
                      >
                        {point.name}
                      </text>
                    </g>
                  ))}
                </g>

                {radar.map((curves, idx) => (
                  <g className={css.wrap} key={idx} id={curves.id}>
                    <path
                      className={css.area}
                      d={radarLine(curves.categories)}
                      fill="none"
                    />
                    <path
                      className={idx == radar.length - 1 ? css.stroke : null}
                      d={radarLine(curves.categories)}
                      strokeWidth={idx == radar.length - 1 ? 2 : 0.5}
                      stroke={idx == radar.length - 1 ? "#fff" : "#4B4B4B"}
                      fill={idx == radar.length - 1 ? "url(#grad)" : "none" }
                    />
                  </g>
                ))}

              </g>
            </svg>

          </div>

        </div>

        {/*<Social stroke="#fff" />*/}
      </section>
    )
  }
}

export default RadarChart;
