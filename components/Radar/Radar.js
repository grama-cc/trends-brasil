import React from 'react';
import css from './Radar.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';

import Section from '../SectionWithFilter/SectionWithFilter.js';

class RadarChart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      radar: null,
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
      dash: 1,
      levels: 1,
      padding: 1.3,
      labelsCirles: 1.2, // circle label distance
      maxValue: 1/6, // biggest circle will value
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  getData = async () => {
    const radar = await Api.getRadar();
    this.setState({ radar });
  }

  componentDidMount() {
    this.getData();
  }

  circleLevels = () => {
    const levels = d3.range(1, (this.config.levels + 1) );
    const diameter = levels.map((d, i) => {
      return this.radius / this.config.levels * d
    });
    return diameter
  }

  values = (data) => {
    const max = Math.max(this.config.maxValue, d3.max(data,
      ((array) => (
        d3.max(array.categories.map(
          (item) => ( (item.percent / 100) + 0.01 )
        ))
      )))
    );
    

    const scale = d3.scaleLinear().range([0, this.radius]).domain([0, max]);
    const angles = - Math.PI * 2 / 6;
    return {
      "max": max,
      "scale": scale,
      "angles": angles,
    }
  }

  axisPosition = (data) => {
    const values = this.values(data)
    const position = data[0].categories.map((d, i) => {
      return {
        "name": d.name,
        "x": values.scale( values.max ) * Math.sin( values.angles * i - Math.PI / 2 ), 
        "y": values.scale( values.max ) * Math.cos( values.angles * i - Math.PI / 2 )
      }
    });
    return position
  }

  renderChart () {
    if(!this.state.radar && !this.props.candidates) {

      return <div className={css.loading}>Loading...</div>

    } else {

      const circles = this.circleLevels();
      let radar = this.state.radar || [];
      const axis = this.axisPosition(radar);
      const values = this.values(radar);

      const radarLine =  d3.radialLine().curve( d3.curveCardinalClosed ).radius(( d ) => ( 
        values.scale( -(d.percent ) / 100 ) )).angle(( d, i ) => ( i * values.angles )
      );
      const filter = this.props.filter;

      const candidates = radar.filter((c) => filter === c.id);

      radar = radar.sort((a, b) => {
        if (a.id === filter) {
          return 1;
        }
        if (b.id === filter) {
          return -1;
        }
        return 0;
      });

      const w = this.config.width + 10;
      const h = this.config.height + 10;

      // console.log(radar)

      return (
        <React.Fragment>

          <div className={css.categories}>
            {axis.map((point, idx) => (
              <p className={css.name} key={idx}>
                {point.name}
              </p>
            ))}
          </div>

          {radar.map((candidate, idx) => {

            const empty = candidate.categories.filter((c) => c.percent === 0)

            if (empty.length === 6 ) {
              // console.log(candidate.name, candidate.id, filter)
              return (
                <div
                  style={{
                    backgroundColor: candidate.color
                  }}
                  className={filter === candidate.id ? css.empty : `${css.none} ${css.empty}`}
                  key={idx}
                > 
                  <h4>Oops :(</h4>
                  <p>O candidato não teve buscas suficientes para gerar a visualização</p>
                </div>
              )
            }
          })}

          <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="none"
          >
            <g 
              transform={`translate(${w / 2}, ${h / 2})`}
            >
              <defs>
                <radialGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="20%" 
                    style={{ 
                      stopColor: filter ? candidates[0].color : '#b4b4b4', 
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
                  </g>
                ))}
              </g>
              <g className={css.areaContainer}>
              {radar.map((curves, idx) => {
                return (
                  <g className={css.wrap} key={idx} id={curves.id}>
                    <path
                      className={css.area}
                      d={radarLine(curves.categories)}
                      fill="none"
                    />
                    <path
                      className={idx == radar.length - 1 && filter ? css.stroke : null}
                      d={radarLine(curves.categories)}
                      strokeWidth={idx == radar.length - 1 && filter ? 2 : 1}
                      stroke={idx == radar.length - 1 && filter ? "#fff" : "#4b4b4b"}
                      opacity={idx == radar.length - 1 && filter ? 1 : .3}
                      fill={idx == radar.length - 1 && filter ? "url(#grad)" : "none" }
                    />
                  </g>
                )
              })}
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
        content='radar'
        arrowColor={this.props.arrowColor}
        lang={this.props.lang}
      >
        <div className={css.radar}>
          {this.renderChart()}
        </div>
      </Section>
    )
  }
}

export default RadarChart;
