import React from 'react';
import PropTypes from 'prop-types';
import css from './Orbital.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/orbital.json'

import Filter from '../Filter.js';
import Description from '../Description.js';
import Section from '../SectionWithFilter/SectionWithFilter.js';
import Social from '../Social/Social.js';

class Orbital extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      orbital: null,
      id: null,
    };

    this.config = {
      width: 270,
      height: 270,
      margin: { 
        top: 100,
        right: 100,
        bottom: 100,
        left: 100 
      },
      levels: 3,
      maxValue: 0.5, // biggest circle will value
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  getData = async () => {
    const orbital = await Api.getOrbit();
    this.setState({ orbital });
  }

  componentDidMount() {
    this.getData();
  }

  values = (data) => {
    const max = Math.max(this.config.maxValue, d3.max(data,
      ((array) => (
        d3.max(array.people.map(
          (item) => ( item.size / 100 )
        ))
      )))
    );

    const scale = d3.scaleLinear().range([this.radius -10 ,0]).domain([0, max]);
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

  renderChart () {
    if (!this.state.orbital) {

      return <div className={css.loading}>Loading...</div>

    } else {

      const orbital = this.state.orbital;

      const w = this.config.width * 1.08;
      const h = this.config.height * 1.08;

      const filter = this.props.filter;

      const circles = this.circleLevels();
      const values = this.values(orbital);
      const levels = d3.range(1, (this.config.levels + 1) ).reverse();

      const candidates = orbital.filter((c) => filter === c.id);

      return ( 
        <React.Fragment>
        <p className={css.middle}>{filter ? candidates[0].name : null}</p>
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
        >
        <g transform={`translate(${w / 2}, ${h / 2})`}>
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
                    width='30'
                    height='20'
                    fill={filter ? candidates[0].color : '#b4b4b4'}
                    stroke='none'
                    className={css.rect}
                    x={-14}
                    y={(-l * this.radius / 3) - 10}
                  />
                  <text
                    x={i != 2 ? -5 : -8}
                    y={-l * this.radius / 3}
                    dy='0.4em'
                    fontSize='10px'
                    fill='#4b4b4b'
                    className={css.text}
                  >
                    {i === 0 ? 10 : ( i * 5 ) * 10}
                  </text>
                </g>
              ))}
            </g>

          </g>
          <g className='dots'>
            {orbital.map((points, idx) => (
              <g className='candidates' key={idx}>

                {points.id === filter ?
                  <g>
                    <circle
                      r={15}
                      cx={0}
                      cy={0}
                      fill='#fff'
                    />
                  </g>
                  : null}


                {points.id === filter ? points.people.map((dot, i) => {

                  const r = dot.size === 0 ? 15 : 7.5

                  let x = values.scale( dot.size / 100 ) * Math.sin( values.angles * i - Math.PI / 2 )
                  let y = values.scale( dot.size / 100 ) * Math.cos( values.angles * i - Math.PI / 2 )

                  y = y + r + 15;

                  return(

                    <g 
                      key={i} 
                      className={css.point}
                    >
                      <circle
                        r={r}
                        cx={x}
                        cy={y}
                        fill='#fff'
                      />
                      <text
                        x={x}
                        y={y - 12}
                        fontSize={10}
                        textAnchor="middle"
                        fill='#fff'
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
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <Section
        onFilter={this.props.onFilter} 
        filter={this.props.filter}
        candidates={this.props.candidates}
        content='orbit'
        arrowColor={this.props.arrowColor}
        lang={this.props.lang}
      >
        <div className={css.orbital}>
          {this.renderChart()}
        </div>
      </Section>
    )
  }
}
export default Orbital;