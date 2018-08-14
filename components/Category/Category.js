import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../lib/Api';

import Slider from 'react-slick';

import Chart from './Bars/Chart/Chart'

import css from './Category.scss';
import content from '../../static/json/category.json';

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
        <React.Fragment>
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


            </div>

          ))}
        </Slider>

        {/*<Chart />*/}
        </React.Fragment>
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
