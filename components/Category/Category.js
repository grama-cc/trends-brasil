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
      bars: null
    };
  }

  getData = async () => {
    const bars = await Api.getBars();
    this.setState({ bars });
  }

  componentDidMount() {
    this.getData();
  }

  renderChartNav () {
    if (!this.state.bars) {
      return
    } else {
      return (
        <ul className={css.nav}>
          <li>Biografia</li>
          <li>Outros</li>
          <li>Celebridades</li>
          <li>Ideologia</li>
          <li>Mídia</li>
          <li>Políticos</li>
        </ul>
      )
    }
  }

  renderChart () {
    if (!this.state.bars) {
      return <div className={css.loading}>Loading...</div>
    } else {
      return (
        <h2>Bar chart</h2>
      )
    }
  }

  render() {
    return (
      <section className={css.category}>

        <div className={css.content}>
          <div className={css.info}>
            <Description content={'category'} />

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
