import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Theme.scss';
import Cloud from '../Cloud.js';

class Theme extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nav: null,
      slider: null
    }
  }

  componentDidMount() {
    this.setState({
      nav: this.nav,
      slider: this.slider
    })
  }

  render() {
    return (
      <div {...this.props} className={css.theme}>
        <Slider
          asNavFor={this.state.nav}
          ref={ slider => ( this.slider = slider ) }
          slidesToShow={1}
          swipeToSlide
          focusOnSelect
        >
          {this.props.category.map((item, i) => (
            <div key={i} className={css.info}>
              <h3>{item.text}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </Slider>

        <Slider
          className='slider'
          asNavFor={this.state.slider}
          ref={ slider => ( this.nav = slider ) }
          arrows={false}
          slidesToShow={1}
          adaptiveHeight={true}
          dots={true}
        >
          {this.props.category.map((item, j) => (
            <div key={j}>
              <Cloud category={item.id} />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

export default Theme;
