import React from 'react';
import PropTypes from 'prop-types';
import css from './SectionWithFilter.scss';
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
    };
  }

  getData = async () => {
    const radar = await Api.getRadar();
    const candidate = await Api.getCandidate();
    this.setState({ radar, candidate });
  }

  componentDidMount() {
    this.getData();

  }

  render() {
    if (!this.state.radar && !this.state.candidate) {
      return <div className={css.loading}>Loading...</div>
    }

    const data = {
      'candidate': this.state.candidate,
      'radar': this.state.radar
    }

    const candidate = data.candidate.find((c) => this.props.filter === c.id)

    return (
      <section
        className={css.radar}
        style={{
          backgroundColor: candidate ? candidate.color : '#b4b4b4'
          //this.props.filter === 0 ? '#b4b4b4' : color
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
                    display: this.props.filter === c.id ? 'block' : 'none'
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
              onFilter={this.props.onFilter}
              data={data.candidate} 
            />
            {this.props.children}
          </div>
        </div>

        {/*<Social stroke="#fff" />*/}
      </section>
    )
  }
}

export default RadarChart;
