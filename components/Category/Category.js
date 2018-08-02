import React from 'react';
import PropTypes from 'prop-types';
import css from './Category.scss';

import content from '../../static/json/category.json'

import Description from '../Description.js';
import Theme from './Theme.js';
import Social from '../Social/Social.js';

import Api from '../../lib/Api';

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const category = await Api.get('/category.json');
    this.setState({ category });
  }

  render() {

    if (!this.state.category) {
      return <div>Loading...</div>
    }

    return (
      <section className={css.category} {...this.props}>

        <Description content={content.description} />
        <Theme category={this.state.category} />
        {/*<Social />*/}

      </section>
    )
  }
}

export default Category;
