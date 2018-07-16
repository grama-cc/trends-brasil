import React from 'react';
import PropTypes from 'prop-types';
import css from './Lines.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';
import content from '../../static/json/keywords.json'

import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lines: null,
      id: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const lines = await Api.get('/lines.json');
    this.setState({ lines });
  }

  getTrends = (link) => {
    const request = new XMLHttpRequest(); // a new request
    request.open( "GET", link ,false );
    request.send( null );
    const json = JSON.parse(request.responseText)
    return json
  }

  render() {
    if (!this.state.lines) {
      return <div>Loading...</div>
    }

    const array = this.state.lines
    const url = array[1].url
    const data = this.getTrends(url);
    console.log(data)

    const width = 600
    const height = 400
    const margin = {left: 10, right: 200, bottom: 10, top: 20}

    const timeRange = d3.extent(data.result, d => +d.time)
    const topics = data.topics

    const xScale = d3.scaleLinear().domain([0, data.result.length - 1]).range([0, width])
    const yScale = d3.scaleLinear().domain([0, topics.length - 1]).range([0, height])


    // determine the rank of each topic
  /*data.result.forEach((datum) => {
    const originalValues = _.clone(datum.value)
    const sortedValues = datum.value.sort(d3.descending)
    datum.ranks = originalValues.map((value, i) => {
      return sortedValues.indexOf(value)
    })
  })*/
  
  // map the ranks to their topics
  //topics.forEach((topic, topicIndex) => {
    //topic.values = data.result.map((result) => {
      //return result.ranks[topicIndex]
    //})
 // })

  const line = d3.line().x((d, i) => xScale(i)).y(d => yScale(d))

    return (
      <section className={css.lines}>
        <Description content={content.description} />
        <Filter {...this.props} candidates={this.state.lines} />

        <svg width={width} height={height}>
          <g transform={`translate(0, 0)`}>
            {/*topics.map((d, i) => {
              <path
                d={line(d.values)}
                stroke={`#000`}
              >
                
              </path>
            })*/}
          </g>
          
        </svg>

        <Social />

      </section>
    )
  }
}

export default Lines;
