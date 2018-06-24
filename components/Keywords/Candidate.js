import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Candidate.scss';
import Cloud from './Cloud.js';

class Candidate extends React.Component {

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
    const data = this.props.data
    return (
      <div {...this.props}>
        <Slider
          className='nav'
          asNavFor={this.state.nav}
          ref={ slider => ( this.slider = slider ) }
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          variableWidth={true}
        >
          {data.map((data, index) => (
            <div className={css.contentImage} key={index}>
              <div
                className={`${css.image} item`}
                style={{
                  backgroundImage: `url(/static/img/candidates/${data.slug}.png)`,
                  backgroundColor: data.color,
                  color: data.color
                }}
              />
            </div>
          ))}
        </Slider>

        <Slider
          className='slider'
          asNavFor={this.state.slider}
          ref={ slider => ( this.nav = slider ) }
          arrows={false}
          slidesToShow={1}
        >
          {data.map((data, index) => (
            <div className={css.info} key={index}>
              <h3>{data.name}</h3>
              <Cloud words={data.words} color={data.color} />
            </div>
          ))}
        </Slider>

      </div>
    )
  }
}

export default Candidate;
