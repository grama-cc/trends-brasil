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
      slider1: null,
    }
  }

  componentDidMount() {
    this.setState({
      nav1: this.nav1,
      slider1: this.slider1
    })
  }

  findIndex = (array, attr, value) => {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return 0;
  }

  render() {
    const data = this.props.data;
    const index = this.findIndex(data, 'id', this.props.id);

    return (
      <div {...this.props} className={this.props.val === 2 && data.length ? css.candidate : `${css.none} ${css.candidate}` }>
        <Media query="(max-width: 800px)">
          {matches =>
            matches ? (
              <Slider
                className='nav'
                asNavFor={this.state.nav1}
                ref={ slider1 => ( this.slider1 = slider1) }
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                centerMode={true}
                variableWidth={true}
                initialSlide={index}
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
          className={`slider`}
          asNavFor={this.state.slider1}
          ref={ slider1 => ( this.nav1 = slider1 ) }
          arrows={true}
          slidesToShow={1}
          initialSlide={index}
        >
          {data.map((data, j) => (
            <div className={css.info} key={j}>
              <h3><span>{data.name}</span></h3>
              <Cloud category={data.id} type='candidate' />
            </div>
          ))}
        </Slider>

      </div>
    )
  }
}

export default Candidate;
