import React from 'react';
import Slider from 'react-slick'

import css from './Candidate.scss';
import Cloud from '../Cloud.js';
import {i18n} from "../../common/locale/i18n";

class Candidate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nav: null,
      slider: null,
    }
  }

  componentDidMount() {
    this.setState({
      nav: this.nav,
      slider: this.slider,
    });
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
    const candidates = this.props.candidates;
    const content = this.props.content;
    const index = this.findIndex(candidates, 'id', this.props.filter);

    return (
      <div
        className={`${css.candidate}`}
        type={this.props.val}
      >
        <Slider
          className='nav'
          asNavFor={this.state.nav}
          ref={ slider => ( this.slider = slider) }
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          variableWidth={true}
        >
          <div className={css.contentImage} key={index}>
            <div
              className={`${css.image} item`}
              style={{
                backgroundImage: `url(/static/img/candidates/none.svg)`,
              }}
            />
          </div>

          {candidates.map((data, index) => (
            <div className={css.contentImage} key={index}>
              <div
                className={`${css.image} item`}
                style={{
                  backgroundImage: `url(/static/img/candidates/${data.slug}.png)`,
                  backgroundColor: data.color,
                }}
              />
              <span className={`${css.position} pos`}>{index + 1}&ordm;</span>
            </div>
          ))}
        </Slider>

        <Slider
          className={`slider`}
          asNavFor={this.state.slider}
          ref={ slider => ( this.nav = slider ) }
          arrows={true}
          slidesToShow={1}
          initialSlide={0}
          // beforeChange={this.slider.slickGoTo(index + 1)}
        > 
          <div className={`${css.info} ${css.choose}`}>
            <h3><span>{i18n('keywords.buttons.choose_candidate', null)}</span></h3>
          </div>
          {candidates.map((item, j) => (
            <div className={css.info} key={j}>
              <h3><span>{item.name}</span></h3>
              <Cloud 
                id={item.id} 
                candidates={this.props.candidates}
                words={this.props.words} 
                type='candidate'
                keywords
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

export default Candidate;
