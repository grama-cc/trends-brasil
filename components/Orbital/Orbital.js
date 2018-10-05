import React from 'react';
import PropTypes from 'prop-types';
import css from './Orbital.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/orbital.json'

import Filter from '../Filter.js';
import Description from '../Description/Description.js';
import Section from '../SectionWithFilter/SectionWithFilter.js';
import Social from '../Social/Social.js';

import {i18n} from '../../common/locale/i18n';

class Orbital extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      orbital: null,
      id: null,
      period: 'month'
    };
    this.config = {
      width: 270,
      height: 270,
      levels: 3,
      maxValue: 0.5, // biggest circle will value
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  onClickPeriod = (period) => {
    this.setState({ period: period })
    this.getData(period);
  }

  getData = async (period) => {
    const orbital = await Api.getOrbit(period);
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

  onFilter = (e) => {
    let id = Number(e.currentTarget.dataset.id)
    this.props.onFilter(id)
  }

  renderChart () {
    if (!this.state.orbital) {

      return <div className={css.loading}>Loading...</div>

    } else {
      const orbital = this.state.orbital;
      const lang = this.props.lang;
      const filter = this.props.filter;
      const w = this.config.width * 1.08;
      const h = this.config.height * 1.08;
      const circles = this.circleLevels();
      const values = this.values(orbital);
      const levels = d3.range(1, (this.config.levels + 1) ).reverse();
      const candidates = orbital.filter((c) => filter === c.id);
      const slug = this.props.candidates ? this.props.candidates.filter((c) => filter === c.id) : [];

      return ( 
        <React.Fragment>
          {this.props.candidates ? 
            <div
              className={css.image}
              style={{
                backgroundImage: filter ? `url(/static/img/candidates/${slug[0].slug}.png` : '',
                backgroundColor: filter ? slug[0].color : 'transparent',
              }}
            />
          : null }

          <p className={css.middle}>{filter ? candidates[0].name : null}</p>

          {orbital.map((candidate, idx) => {
            if (candidate.people.length === 0 && candidate.id === filter) {
              return (
                <div
                  style={{ backgroundColor: candidate.color }}
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
            className="Orbital_chart"
            viewBox={`0 0 ${w} ${h}`}
            style={{
              backgroundColor: filter ? candidates[0].color : '#b4b4b4'
            }}
          >
            <title>{i18n('orbit.title', lang)}</title>
            <defs>
              <text className='description'>
                {i18n('orbit.description', lang)}
                {i18n('orbit.highlight', lang)}
              </text>
              <text className='more'>
                {i18n('orbit.button', lang)} - {i18n('orbit.more', lang)}
              </text>
            </defs>
            
            <g transform={`translate(${w / 2}, ${h / 2})`}>
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

                    const max = 110;

                    const r = dot.size === 0 ? 7 : 7
                    let x = (values.scale( dot.size / 100 ) * Math.sin( (values.angles * i) - Math.PI / 2  + (r * i * 2)))
                    let y = (values.scale( dot.size / 100 ) * Math.cos( (values.angles * i) - Math.PI / 2  + (r * i * 2)))

                    const color = orbital.filter((o) => dot.is_candidate === o.id);

                    x = x < - max ? - max : x > max ? max : x;
                    y = y < - max ? - max : y > max ? max : y;

                    let styleSheet = document.styleSheets[0];

                    let keyframes = `
                    @keyframes animation${i} {
                      0% {
                        transform: rotate(0deg) translate(${x}px, ${y}px) rotate(0deg);
                      }
                      100% {
                        transform: rotate(360deg) translate(${x}px, ${y}px) rotate(-360deg);
                      }
                    }`;

                    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                    
                    let style = {
                      animationName: `animation${i}`,
                      transform:`translate(${x}px, ${y}px)`,
                    };

                    return (
                      <g 
                        key={i} 
                        className={css.point}
                        style={style}
                        data-id={dot.is_candidate ? color[0].id : null}
                        onClick={dot.is_candidate ? this.onFilter : null}
                      >
                        <circle
                          stroke='#fff'
                          r={7}
                          fill={dot.is_candidate ? color[0].color : '#fff'}
                          style={{
                            animationDelay: `${0.2*i}s`
                          }}
                        />
                        <text
                          y={-12}
                          fontSize={10}
                          textAnchor="middle"
                          fill='#fff'
                          style={{
                            animationDelay: `${0.2*i}s`
                          }}
                        >
                          {dot.text}
                        </text>
                      </g>

                  )}) : null}
                </g>
              ))}
            </g>
          </svg>
        </React.Fragment>
      )
    }
  }

  render() {
    const lang = this.props.lang
    return (
      <Section
        onFilter={this.props.onFilter} 
        filter={this.props.filter}
        candidates={this.props.candidates}
        content='orbit'
        arrowColor={this.props.arrowColor}
        lang={this.props.lang}
        period={this.state.period}
        onClickPeriod={this.onClickPeriod}
        parent="Orbital_orbital_1KHG9"
        load={this.props.load}
        round={this.props.round}
      >
        <div className={css.chart_container}>
          <p className={css.legend}>
            {i18n('orbit.legend', lang)}
          </p>
          <div className={css.orbital}>
            {this.renderChart()}
          </div>
        </div>
      </Section>
    )
  }
}
export default Orbital;