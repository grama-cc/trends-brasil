import React from 'react';
import css from './Lines.scss';

import * as d3 from "d3";
import * as d3Axis from 'd3-axis'

import Api from '../../lib/Api';
import content from '../../static/json/lines.json'

import data from './data.js'

import Period from '../Period/Period.js';
import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Lines extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.cfg = {
      width: 1000,
      height: 420,
      rect: 20,
      margin: { top: 0, right: 0, bottom: 0, left: 30 },
      padding: 50,
    }
  }

  componentDidMount() {
    // http://brasil-trends.herokuapp.com/v1/dates/1/
    // http://brasil-trends.herokuapp.com/v1/candidate_line/?candidate_id=2
    // http://brasil-trends.herokuapp.com/v1/aggregated_line/
    // this.renderAxis();

    this.getData();
  }

  getData = async () => {
    const dates = await Api.getDates();
    const aggregatedLine = await Api.getAggregatedLine();
    const candidateLine = await Api.getCandidateLine(3);
    this.setState({
      dates,
      aggregatedLine,
      candidateLine,
    });
  }

  renderFilter () {
    if (!this.props.candidates) {
      return
    } else {
      return (
        <Filter 
          onFilter={this.props.onFilter} 
          filter={this.props.filter}
          candidates={this.props.candidates}
          all
          arrowColor='#b4b4b4'
        />
      )
    }
  }

  timeConverter = (timestamp) => {
    const stamp = new Date(timestamp * 1000);
    const months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    const year = stamp.getFullYear();
    const month = months[stamp.getMonth()];
    const date = stamp.getDate();
    const hour = stamp.getHours();
    const min = stamp.getMinutes();
    const sec = stamp.getSeconds();
    const time = date + '/' + month;
    return time;
  }

  renderAxis() {

    // const epa = data[0].lines[0].timestamp;
    // console.log(this.timeConverter(epa));

    // const xScale = d3.scaleBand()
    //   .padding(0.5)
    //   .domain(data[0].lines.map(d => this.timeConverter(d.timestamp)))
    //   .range([0, this.cfg.width])
    
    // const axisType = `axisBottom`
    // const axis = d3Axis[axisType]()
    //   .scale(xScale)
    //   .tickSize(-((this.cfg.height - 50) - this.cfg.margin.top - this.cfg.margin.bottom ))
    //   .tickPadding([12])
    //   .ticks([4])

    // d3.select(this.axisElement).call(axis)
  }

  renderChart () {
    // const h = this.cfg.height - 50;

    // const xepa = d3.scaleLinear()
    //   .domain([0, 4])
    //   .range([0, 900]);

    // const yepa = d3.scaleLinear()
    //   .domain([0, 100])
    //   .range([300, 0]);


    // var x = d3.scaleLinear()
    // .domain([10, 130]) // input
    // .range([0, 960]); // output

// console.log(x(10));
// console.log(new Date(1534204800 * 1000))



var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// console.log(d3)
var x = d3.scaleTime()
    .domain([new Date, new Date])
    .nice(d3.timeWeek)
    .range([0, width]);

// var svg = d3.select(".Lines_lines_q3Iso").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.append("g")
    // .attr("class", "x axis")
    // .call(d3.svg.axis().scale(x).orient("bottom"));
    // .call(d3Axis['axisLeft']().scale(x).orient("bottom"));
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 200])

    // const axis = d3Axis.axisBottom()
    //   .scale(yScale)
    //   .tickSize(-(500 - 200))
    //   .tickPadding([12])
    //   .ticks([4])
    // d3.select(this.axisElement).call(axis)

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 800])

    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const axis = d3Axis.axisBottom()
      .scale(x)
      .tickSize(100)
      .tickPadding([10])
      .ticks([7])
      .tickFormat(function(d, i){
        return week[d]
      })
    d3.select(this.axisElement).call(axis)

// var xAxis = d3.svg.axis()
//         .scale(x)
//         .ticks(6)
//         .tickSubdivide(true)
//         .tickSize(6, 3, 0)
//         .tickFormat(d3.time.format("%A"))
//         .orient("bottom");



    // const axisType = `axisLeft`
    // const axis2 = d3Axis.axisTop()
    //   .scale(yScale)
    //   .tickSize(-(500 - 200))
    //   .tickPadding([12])
    //   .ticks([4])
    // d3.select(this.axisElement).call(axis2)


// d3.select("body").append("svg")
//     .attr("width", 1440)
//     .attr("height", 30)
//   .append("g")
//     .attr("transform", "translate(0,30)")
    // .call(axis);

// TODO datas são em segundos, tem que multiplicar por 1000

      // x(20); // 80
      // x(50); // 320



    let minTimestamp = Infinity; //1534204800
    let maxTimestamp = 0;// 1534820400
    let minPercent = Infinity;   
    let maxPercent = 0;

    data.forEach(candidate => {
      candidate.lines.forEach(line => {
        if (line.timestamp < minTimestamp) {
          minTimestamp = line.timestamp;
        }
        if (line.timestamp > maxTimestamp) {
          maxTimestamp = line.timestamp;
        }
        if (line.percent < minPercent) {
          minPercent = line.percent;
        }
        if (line.percent > maxPercent) {
          maxPercent = line.percent;
        }
      })
    })
  
    const scaleTime = d3.scaleTime()
      .domain([minTimestamp, maxTimestamp])
      .range([0, this.cfg.width])

    const scalePercent = d3.scaleLinear()
      .domain([minPercent, maxPercent])
      .range([this.cfg.height, 0])

    console.log(minTimestamp, maxTimestamp)
    console.log(minPercent, maxPercent)
    // {
    //   "date": "2018-08-14",
    //   "timestamp": 1534204800,
    //   "percent": 2
    // },



    // this.cfg = {
    //   width: 1000,
    //   height: 420,
    //   rect: 20,
    //   margin: { top: 0, right: 0, bottom: 0, left: 30 },
    //   padding: 10,
    // }
    return (
      <React.Fragment>
        <svg 
          className={css.chart}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.cfg.width} ${this.cfg.height}`}
          preserveAspectRatio="none"
          style={{
            padding: `${this.cfg.padding}px`,
            backgroundColor: `purple`,
          }}
        >
          <g
            transform={`translate(100, ${100})`}
            // transform={`translate(0, ${this.cfg.height - 65 - this.cfg.margin.bottom})`}
          >
            <g
              className={css.axis}
              ref={(y) => { this.axisElement = y; }}
            />
          </g>
          <g>
              {/* Lines */}
              {data.map((d, i) => {
                const path = d3.line()
                  .x((d) => { return scaleTime(d.timestamp) })
                  .y((d) => { 
                    return scalePercent(d.percent);
                    return (15 * i);//  + Math.random()*10 +  (d.percent * 100)
                    // return (15 * i) 
                  })
                return (
                  <path
                    key={i}
                    d={path(d.lines)}
                    stroke={`#000`}
                    strokeWidth={2}
                    fill="none"
                  />
                )
              })}
          </g>
        </svg>
      </React.Fragment>
    )
  }

  render() {
    if (!this.state.dates) return null;
    return (
      <section className={css.lines}>
        <div className={css.info}>
          <Description
            content='lines'
            arrowColor={this.props.arrowColor}
            lang={this.props.lang}
          />
          {this.renderFilter()}
        </div>
        
        {this.renderChart()}

				<Period
          bgColor='#fff'
          color='#b4b4b4'
          arrowColor={this.props.arrowColor}
          all
        />
				<Social stroke='#b4b4b4' />
      </section>
    )
  }

}

export default Lines;
