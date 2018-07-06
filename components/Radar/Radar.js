import React from 'react';
import PropTypes from 'prop-types';
import css from './Radar.scss';
import * as d3 from "d3";

import Api from '../../lib/Api';

class RadarChart extends React.Component {
  constructor (props) {
    super(props)
    this.config = {
      width: 300, // fazer o responsivo
      height: 300, // fazer o responsivo
      margin: { 
        top: 100,
        right: 100,
        bottom: 100,
        left: 100 
      },
      levels: 5,
      maxValue: 0.5, // biggest circle will value
      labelFactor: 1.2,  // words circle distance How much
      wrapWidth: 60,     // words line break
      opacityArea: 0.35,
      dotRadius: 4,
      opacityCircles: 0.1,
      strokeWidth: 2,
      roundStrokes: true,
      color: d3.scaleOrdinal().range([ "#EDC951", "#CC333F", "#00A0B0" ]) // color no array
    };

    // Circle radius
    this.radius = Math.min(this.config.width / 2, this.config.width / 2);
  }

  RadarChartTest = (data) => {

  // If the supplied maxValue is smaller than the actual one, replace by the max in the data
  var maxValue = Math.max(this.config.maxValue, d3.max(data, function(i){
    return (
      d3.max(i.map(function(o){ return o.value; }))
    )
  }));
  
  // Names of each axis
  var allAxis = (data[0].map(function(i, j){return i.axis}));

  // The number of different axes
  var total = allAxis.length; 

  // The width in radians of each "slice" 
  var angleSlice = Math.PI * 2 / total;   
  
  // Scale for the radius
  var rScale = d3.scaleLinear().range([0, this.radius]).domain([0, maxValue]);




/*
  // Draw the axes
  
  //Create the straight lines radiating outward from the center
  var axis = axisGrid.selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");

  //Append the lines
  axis.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function(d, i){ return rScale(maxValue) * Math.cos(angleSlice*i - Math.PI/2); })
    .attr("y2", function(d, i){ return rScale(maxValue) * Math.sin(angleSlice*i - Math.PI/2); })
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-dasharray", 2)
    .style("stroke-width", 2);
*/

/*

  /////////////////////////////////
  // Draw the radar chart blobs
  //The radial line function
  var radarLine = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(function(d) { return rScale(d.value); })
    .angle(function(d,i) {  return i*angleSlice; });
    
  if(cfg.roundStrokes) {
    radarLine.interpolate("cardinal-closed");
  }
        
  //Create a wrapper for the blobs  
  var blobWrapper = g.selectAll(".radarWrapper")
    .data(data)
    .enter().append("g")
    .attr("class", "radarWrapper")
    .attr("id", function(d, i) { return 'layer_'+i });
      
  //Append the backgrounds  
  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", function(d,i) { return radarLine(d); });
    
  //Create the outlines 
  blobWrapper.append("path")
    .attr("class", "radarStroke")
    .attr("d", function(d,i) { return radarLine(d); })
    .style("stroke-width", 1)
    .style("stroke", '#4B4B4B')
    .style("fill", "none");
*/
}
  // Draw circles levels
  circleLevels = () => {
    const levels = d3.range(1, (this.config.levels + 1) );

    const diameter = levels.map((d, i) => {
      return this.radius / this.config.levels * d
    });

    return diameter
  }


  render() {
    const data = [
      [
        {axis:"Politicos",value:0.28},
        {axis:"Outros",value:0.02},
        {axis:"Biografia",value:0.22},
        {axis:"Celebridades",value:0.29},
        {axis:"Ideologia",value:0.17},
        {axis:"Notícias",value:0.22},
        
      ],[
        {axis:"Politicos",value:0.10},
        {axis:"Outros",value:0.04},
        {axis:"Biografia",value:0.26},
        {axis:"Celebridades",value:0.30},
        {axis:"Ideologia",value:0.14},
        {axis:"Notícias",value:0.22},
        
      ],[
        {axis:"Politicos",value:0.16},
        {axis:"Outros",value:0.13},
        {axis:"Biografia",value:0.27},
        {axis:"Celebridades",value:0.35},
        {axis:"Ideologia",value:0.13},
        {axis:"Notícias",value:0.20},
      ],
    ];

    const circles = this.circleLevels();

    return (
      <section className={css.radar} {...this.props}>

        <div className="radarChart">
          <svg width={this.config.width} height={this.config.height} className='radarChart'>
            
            <g transform={`translate(${this.config.width / 2}, ${this.config.height / 2})`}>
        
              <defs>
                <radialGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="40%" style={{ stopColor: '#ff7e7e', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 0.4 }} />
                </radialGradient>
              </defs>

              <g className='axisWrapper'>
                {circles.map((diameter, idx) => (
                  <circle
                    key={idx}
                    className="gridCircle"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="2"
                    fillOpacity={this.config.opacityCircles}
                    r={diameter}
                  />
                ))}
              </g>

  
 


            </g>
          </svg>


        </div>

        {this.RadarChartTest(data)}


      </section>
    )
  }
}

export default RadarChart;
