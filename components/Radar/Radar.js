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
      id: null,
    };

    this.config = {
      width: 300, // fazer o responsivo
      height: 300, // fazer o responsivo
      margin: { 
        top: 100,
        right: 100,
        bottom: 100,
        left: 100 
      },
      levels: 1,
      maxValue: 0.5, // biggest circle will value
      // color: d3.scaleOrdinal().range([ "#85C974", "#CECCCF", "#DFBCA2" ]) // color no array
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const radar = await Api.get('/radar/');
    // const radar = await Api.get('/radar/?period=7%201-d');
    this.setState({ radar });
  }

  values = (data) => {
    const max = Math.max(this.config.maxValue, d3.max(data,
      ((array) => (
          // console.log(array.categories),
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
      return {
        "x": values.scale( values.max ) * Math.sin( values.angles * i - Math.PI / 2 ), 
        "y": values.scale( values.max ) * Math.cos( values.angles * i - Math.PI / 2 )
      }
    })
    return position
  }

  render() {
    if (!this.state.radar) {
      return <div>Loading...</div>
    }

    let data = this.state.radar;
    const circles = this.circleLevels();
    const axis = this.axisPosition(data);
    const values = this.values(data)
    const radarLine =  d3.radialLine().curve( d3.curveCardinalClosed ).radius(( d ) => ( values.scale( d.percent / 100 ) )).angle(( d, i ) => ( i * values.angles ));

    data = data.sort((a, b) => {
      if (a.id === this.props.filter || b.id === this.props.filter) {
        return 1;
      }
        return 0;
    })

    return (
      <section
        className={css.radar}
        style={{
          backgroundColor: this.props.filter === 0 ? '#B4B4B4' : data[data.length - 1].color
        }}
      >
        <Description content={content.description} />

        <Filter {...this.props} candidates={this.state.radar} />

        <svg width={this.config.width} height={this.config.height}>
          <g transform={`translate(${this.config.width / 2}, ${this.config.height / 2})`}>
            
            <defs>
              <radialGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="20%" style={{ 
                  stopColor: this.props.filter === 0 ? '#B4B4B4' : data[data.length - 1].color, 
                  stopOpacity: 0.1 }} 
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
                  strokeDasharray={1}
                  r={diameter}
                />
              ))}

              {axis.map((point, idx) => (
                <line
                  key={idx}
                  stroke="#fff"
                  strokeDasharray={1}
                  className={css.axis}
                  x1={0}
                  y1={0}
                  x2={point.x}
                  y2={point.y}
                />
              ))}

            </g>

            {data.map((curves, idx) => (
              <g className={css.wrap} key={idx} id={curves.id}>
                <path
                  className={css.area}
                  d={radarLine(curves.categories)}
                  fill="none"
                />
                <path
                  className={idx == data.length - 1 ? css.stroke : null}
                  d={radarLine(curves.categories)}
                  strokeWidth={idx == data.length - 1 ? 2 : 0.5}
                  stroke={idx == data.length - 1 ? "#fff" : "#4B4B4B"}
                  fill={idx == data.length - 1 ? "url(#grad)" : "none" }
                />
              </g>
            ))}

          </g>
        </svg>

        <Social stroke="#ffffff" />
      </section>
    )
  }
}

export default RadarChart;
