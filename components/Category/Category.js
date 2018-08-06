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

  render() {

    if (!this.state.bars) {
      return <div className={css.loading}>Loading...</div>
    }

    console.log(this.state.bars)

    return (
      <section className={css.category} {...this.props}>

        <div className={css.content}>
          <div className={css.info}>
            <Description content={'category'} />

            <ul className={css.nav}>
              <li>Biografia</li>
              <li>Outros</li>
              <li>Celebridades</li>
              <li>Ideologia</li>
              <li>Mídia</li>
              <li>Políticos</li>
            </ul>

          </div>

          <div className={css.chart}>
            <h2>Bar chart</h2>
          </div>

        </div>

        <Social stroke='#b4b4b4' />
      </section>
    )
  }
}

export default Category;
