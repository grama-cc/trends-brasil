import React from 'react';
import css from './Radar.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';

import Section from '../SectionWithFilter/SectionWithFilter.js';

import {i18n} from '../../common/locale/i18n';

class RadarChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      radar: null,
      id: null,
      period: 'month'
    };

    this.config = {
      width: 270,
      height: 350,
      dash: 1,
      levels: 2,
      padding: 1.3,
      labelsCirles: 1.2, // circle label distance
      maxValue: 1/5, // biggest circle will value
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  onClickPeriod = (period) => {
    this.setState({ period: period })
    this.getData(period);
  }

  getData = async (period) => {
    const radar = await Api.getRadar(period);
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
          (item) => ( (item.percent / 100) + 0.27 )
        ))
      )))
    );

    const scale = d3.scaleLinear().range([-15, this.radius]).domain([0, max]);
    const angles = - Math.PI * 2 / 5;

    return {
      "max": max,
      "scale": scale,
      "angles": angles,
    }
  }

  renderChart () {
    if(!this.state.radar || !this.props.candidates) {

      return <div className={css.loading}>Loading...</div>

    } else {
      const circles = this.circleLevels();
      let candidates = this.props.candidates;
      let radar = this.state.radar || [];

      let data = this.state.data;

      if(this.props.round === 2) {
        radar = radar.filter((c) => candidates[0].id === c.id || candidates[1].id === c.id);
      }

      const values = this.values(radar);

      let axis = this.state.radar ? radar[0].categories.map((d, i) => {
        return {
          "name": d.name,
          "id": d.id,
          "x": values.scale( values.max ) * Math.sin( values.angles * i - Math.PI / 2 ), 
          "y": values.scale( values.max ) * Math.cos( values.angles * i - Math.PI / 2 )
        }
      }) : [];

      const radarLine =  d3.radialLine().curve( d3.curveCardinalClosed ).radius(( d ) => ( 
        values.scale( -(d.percent) / 100 ) )).angle(( d, i ) => ( i * values.angles )
      );
      const filter = this.props.filter;
      candidates = this.state.radar ? radar.filter((c) => filter === c.id) : [];

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
      const lang = this.props.lang;

      axis = axis.filter((a, i) => a.id != 2 )

      return (
        <React.Fragment>
          {radar.map((candidate, idx) => {
            const empty = candidate.categories.filter((c) => c.percent === 1)
            if (empty.length === 6 ) {
              return (
                <div
                  style={{
                    backgroundColor: candidate.color
                  }}
                  className={filter === candidate.id ? css.empty : `${css.none} ${css.empty}`}
                  key={idx}
                > 
                  <h4>Oops :(</h4>
                  <p>{i18n('orbit.empty', lang)}</p>
                </div>
              )
            }
          })}
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${w} ${h}`}
            transform={`rotate(90)`}
            style={{
              backgroundColor: filter ? candidates[0].color : '#b4b4b4',
              padding: '0 12px 0'
            }}
          >
            <title>{i18n('radar.title', lang)}</title>
            <defs>
              <text className='description'>
                {i18n('radar.description', lang)}
                {i18n('radar.highlight', lang)}
              </text>
              <text className='more'>
                {i18n('radar.button', lang)} - {i18n('radar.more', lang)}
              </text>
            </defs>

            <g transform={`translate(${w / 2}, ${(h / 2) + 10})`}>
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

                <g>
                {axis.map((a, idx) => {
                  return(
                    <text
                      className={css.axis}
                      fontSize='10px'
                      textAnchor={a.id === 3 || a.id === 1 ? 'start' : a.id === 5 || a.id === 4 ? 'end' : 'middle'}
                      transform={`translate(${a.x * 1.07},${-a.y * 1.07})rotate(-90)`}
                      fontWeight='500'
                      fill='#4b4b4b'
                      dy={'0.35em'}
                      key={idx} 
                    >
                      {i18n('radar.names', lang)[idx]}
                    </text>
                  )
                })}
                </g>
              </g>
              <g className={css.areaContainer} transform={`rotate(90)`}>
                {radar.map((curves, idx) => {
                  const filterCurve = curves.categories.filter((r, i) => r.id != 2 )
                  return (
                    <g className={css.wrap} key={idx} id={curves.id}>
                      <path
                        className={css.area}
                        d={radarLine(filterCurve)}
                        fill="none"
                      />
                      <path
                        className={idx == radar.length - 1 && filter ? css.stroke : null}
                        d={radarLine(filterCurve)}
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
    const lang = this.props.lang;

    return (
      <Section
        onFilter={this.props.onFilter} 
        filter={this.props.filter}
        candidates={this.props.candidates}
        content='radar'
        arrowColor={this.props.arrowColor}
        lang={this.props.lang}
        period={this.state.period}
        onClickPeriod={this.onClickPeriod}
        parent="Radar_radar_1qzAg"
        load={this.props.load}
        round={this.props.round}
      >

        <div className={css.chart_container}>
          <p className={css.legend}>
            {i18n('radar.legend', lang)}
          </p>
          <div className={css.radar}>
            {this.renderChart()}
          </div>
        </div>
      </Section>
    )
  }
}

export default RadarChart;
