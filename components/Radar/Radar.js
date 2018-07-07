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
      radar: null
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
      color: d3.scaleOrdinal().range([ "#EDC951", "#CC333F", "#00A0B0" ]) // color no array
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const radar = await Api.get('/radar.json');
    this.setState({ radar });
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
      return {
        "x": values.scale( values.max ) * Math.sin( values.angles * i - Math.PI / 2 ), 
        "y": values.scale( values.max ) * Math.cos( values.angles * i - Math.PI / 2 )
      }
    })
    return position
  }

  array_move = (arr, old_index, new_index) => {

    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

  render() {
    if (!this.state.radar) {
      return <div>Loading...</div>
    }

    const data = this.state.radar;
    const circles = this.circleLevels();
    const axis = this.axisPosition(data);
    const values = this.values(data)
    const radarLine =  d3.radialLine().curve( d3.curveCardinalClosed ).radius(( d ) => ( values.scale( d.percent / 100 ) )).angle(( d, i ) => ( i * values.angles ));

    // Faz o update da posição no arra para jogar o current para frente
    const oi = this.props.filter
    const array = data.findIndex((c, i) => (c.id == oi));
    const novo = this.array_move(data, array, data.length - 1)
    // console.log(this.props.filter, array, novo)


    return (
      <section className={css.radar}>
        <Description content={content.description} />

        <Filter {...this.props} candidates={this.state.radar} />

        <svg width={this.config.width} height={this.config.height}>
          <g transform={`translate(${this.config.width / 2}, ${this.config.height / 2})`}>
            
            <defs>
              <radialGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="20%" style={{ stopColor: '#ff7e7e', stopOpacity: 0.1 }} />
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

            {novo.map((curves, idx) => (
              <g className={css.wrap} key={idx}>
                <path
                  className={css.area}
                  d={radarLine(curves.categories)}
                  fill="none"
                />
                <path
                  className={css.stroke}
                  d={radarLine(curves.categories)}
                  strokeWidth={curves.id == 16 ? 2 : 0.5}
                  stroke={curves.id == 16 ? "#fff" : "#4B4B4B"}
                  fill={curves.id == 16 ? "url(#grad)" : "none" }
                />
              </g>
            ))}

          </g>
        </svg>

        <Social />
      </section>
    )
  }
}

export default RadarChart;
