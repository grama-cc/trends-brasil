import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import Media from "react-media";

import css from './Candidate.scss';
import Cloud from '../Cloud.js';

class Candidate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nav1: null,
      slider1: null
    }
  }

  componentDidMount() {
    this.setState({
      nav1: this.nav1,
      slider1: this.slider1
    })
  }

  render() {
    if(!this.props.data) {
      return <div>Loading</div>
    }

    const data = this.props.data

    return (
      <div {...this.props} className={css.candidate}>
        <Media query="(max-width: 800px)">
          {matches =>
            matches ? (
              <Slider
                className='nav'
                asNavFor={this.state.nav1}
                ref={ slider1 => ( this.slider1 = slider1 ) }
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
                    <span className={`${css.position} pos`}>{index + 1}&ordm;</span>
                  </div>
                ))}
              </Slider>
              ) : null
            }
          </Media>

        <Slider
          className='slider'
          asNavFor={this.state.slider1}
          ref={ slider1 => ( this.nav1 = slider1 ) }
          arrows={true}
          slidesToShow={1}
        >
          {data.map((data, j) => (
            <div className={css.info} key={j}>
              <h3>{data.name}</h3>
              <Cloud category={data.id} candidate />
            </div>
          ))}
        </Slider>

      </div>
    )
  }
}

export default Candidate;
