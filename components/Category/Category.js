import React from 'react';
import PropTypes from 'prop-types';
import css from './Category.scss';
import content from '../../static/json/category.json'
import Description from '../Description.js';

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <section className={css.category} {...this.props}>

        <Description content={content.description} />

        <h2>Category</h2>

      </section>
    )
  }
}

export default Category;
