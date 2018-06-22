import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './KeywordsFilter.scss';
import KeywordsCloud from './KeywordsCloud.js';

class SliderThumbs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nav1: null,
      nav2: null
    }
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    })
  }


  render() {

    return (

      <div {...this.props}>

        <Slider
          className='nav'
          asNavFor={this.state.nav1}
          ref={ slider => ( this.slider2 = slider ) }
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
        >

        {this.props.data.map((d, i) => {
          return (
            <div key={i} className='slider-nav'>
              <div className='image'>
                <div
                  className={`${css.t} item`}
                  style={{
                    backgroundImage: `url(/static/img/candidates/${d.slug}.png)`,
                    backgroundColor: d.color,
                    color: d.color
                  }}
                />
              </div>
            </div>
          )
        })}

        

        
        

        </Slider>

        <Slider
          className='slider'
          asNavFor={this.state.nav2}
          ref={ slider => ( this.slider1 = slider ) }
          arrows={false}
          //centerMode={true}
          slidesToShow={1}
        >
{this.props.data.map((d, i) => {
            return (

              <div className='slider-info' key={i}>
                <p>{d.name}</p>
                <KeywordsCloud words={d.words} />
              </div>

            )
          })}
        


        </Slider>



      </div>
    )

  }


}

SliderThumbs.propTypes = {
  children: PropTypes.node,
};

SliderThumbs.defaultProps = {
  children: null,
};

export default SliderThumbs;
