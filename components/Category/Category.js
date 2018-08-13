import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../lib/Api';
import Slider from 'react-slick'

import css from './Category.scss';
import content from '../../static/json/category.json'

import Description from '../Description.js';
import Social from '../Social/Social.js';

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bars: null,
      nav: null,
      slider: null,
    };
  }

  getData = async () => {
    const bars = await Api.getBars();
    this.setState({ bars });
  }

  componentDidMount() {
    this.getData();
    this.setState({
      nav: this.nav,
      slider: this.slider,
    });
  }

  renderChartNav () {
    if (!this.state.bars) {

      return

    } else {

      const bars = this.state.bars;
      return (
        <Slider
          className={`${css.nav} barsNav`}
          asNavFor={this.state.nav}
          ref={ slider => ( this.slider = slider) }
          slidesToShow={6}
          swipeToSlide={true}
          focusOnSelect={true}
          variableWidth={true}
        >
        {bars.map((category, idx) => (
          <div key={idx}>
            <p
              className={css.item}
              style={{
                backgroundImage: `url(/static/img/categories/${category.id}.svg)`,
              }}
            >
              {category.name}
            </p>
          </div>
        ))}
        </Slider>
      )
    }
  }

  renderChart () {
    if (!this.state.bars) {

      return <div className={css.loading}>Loading...</div>

    } else {

      const bars = this.state.bars;

      return (
        <Slider
          className={`slider`}
          asNavFor={this.state.slider}
          ref={ slider => ( this.nav = slider ) }
          arrows={true}
          slidesToShow={1}
          initialSlide={0}
          dots={true}
        > 
          {bars.map((category, idx) => (
            <div key={idx}>

              <h2>{category.name}</h2>
{/*
var svg = d3.select("svg"),
margin = {top: 20, right: 20, bottom: 30, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); });
});
*/}


            </div>

          ))}
        </Slider>
      )
    }
  }

  render() {
    return (
      <section className={css.category}>

        <div className={css.content}>
          <div className={css.info}>

            <Description
              content={content.description}
              arrowColor={this.props.arrowColor}
            />

            {this.renderChartNav()}
          </div>

          <div className={css.chart}>
            {this.renderChart()}
          </div>

        </div>

        <Social stroke='#b4b4b4' />
      </section>
    )
  }
}

export default Category;
