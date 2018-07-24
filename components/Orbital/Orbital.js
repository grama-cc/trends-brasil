import React from 'react';
import PropTypes from 'prop-types';
import css from './Orbital.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/keywords.json'

import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Orbital extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      orbital: null,
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
      levels: 3,
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
    const orbital = await Api.get('/orbit/');
    this.setState({ orbital });
  }

  values = (data) => {
    const max = Math.max(this.config.maxValue, d3.max(data,
      ((array) => (
        //console.log(array.people),
        d3.max(array.people.map(
          (item) => ( item.size / 100 )
        ))
      )))
    );

    const scale = d3.scaleLinear().range([0, this.radius]).domain([0, max]);
    const angles = Math.PI * 2 / data[0].people.length;

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

  findIndex = (array, attr, value) => {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return 0;
  }

  render() {
    if (!this.state.orbital) {
      return <div>Loading...</div>
    }

    let data = this.state.orbital;
    const circles = this.circleLevels();
    const values = this.values(data);
    const levels = d3.range(1, (this.config.levels + 1) ).reverse();
    const color = data[data.length - 1].color

    data = data.sort((a, b) => {
      if (a.id === this.props.filter || b.id === this.props.filter) {
        return 1;
      }
      return 0;
    })

    return (
      <section
        className={css.orbital}
        style={{
          backgroundColor: this.props.filter === 0 ? '#B4B4B4' : color,
        }}
      >
        <Description content={content.description} />

        <Filter {...this.props} candidates={this.state.orbital} />

        <svg width={this.config.width} height={this.config.height}>
          <g transform={`translate(${this.config.width / 2}, ${this.config.height / 2})`}>
            <g className='base'>
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
              <g>
                {levels.map((l, i) => (
                  <g key={i}>
                    <rect
                      width="30"
                      height="20"
                      fill={this.props.filter === 0 ? '#B4B4B4' : color}
                      stroke={`none`}
                      x={-14}
                      y={(-l * this.radius / 3) - 10}
                    />
                    <text
                      x={i != 2 ? -8 : -12.5}
                      y={-l * this.radius / 3}
                      dy={'0.4em'}
                      fontSize={15}
                      fill={'#000'}
                    >
                      {i === 0 ? 10 : ( i * 5 ) * 10}
                    </text>
                  </g>
                ))}
              </g>
            </g>
            <g className='dots'>
              {data.map((points, idx) => (
                <g className='candidates' key={idx}>
                  {points.id === this.props.filter ? points.people.map((dot, i) => {

                    const r = dot.size === 0 ? 15 : 7.5
                    let x = values.scale( dot.size / 100 ) * Math.sin( values.angles * i - Math.PI / 2 )
                    let y = values.scale( dot.size / 100 ) * Math.cos( values.angles * i - Math.PI / 2 )
                    y = y + r + 15;

                    return(

                    <g key={i}>
                      <circle
                        r={r}
                        cx={values.scale( dot.size / 100 ) * Math.sin( values.angles * i - Math.PI / 2 )}
                        cy={values.scale( dot.size / 100 ) * Math.cos( values.angles * i - Math.PI / 2 )}
                        fill={`#fff`}
                      />
                      <text
                        x={x}
                        y={y}
                        fontSize={12}
                        textAnchor="middle"
                      >
                        {dot.text}
                      </text>
                    </g>

                  )}) : null}


                </g>
              ))}
            </g>
          </g>
        </svg>
        <Social />
      </section>
    )
  }
}

export default Orbital;
