import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './KeywordsFilter.scss';

//import KeywordsCloud from './KeywordsCloud.js';

import SliderThumbs from './SliderThumbs.js';

class KeywordsFilter extends React.Component {


  /*
    display: block;
    position: absolute;
    top:  50%; 
    left: 50%;
    width:  $item-size;
    height: $item-size;
    margin: -($item-size / 2);
  
    $angle: (360 / $item-count);
    $rot: 0;

    //@for $i from 1 through $item-count {
      //&:nth-of-type(#{$i}) {
        transform: rotate($rot * 1deg) translate($circle-size / 2) rotate($rot * -1deg);
      }
      $rot: $rot + $angle;
    }
*/

  // save only current item index
  constructor (props) {
    super(props)

    /*
    this.slideNav = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      arrows: true,
      variableWidth: true,
      asNavFor: 'slider-info'
    }
    this.slider = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: 'slider-nav'
    }*/

    this.state = {
      current: null,
      selected: 2,
      active: false,
      index: null,

      nav1: null, // slick nav and slider
      nav2: null // slick nav and slider

    }
  }

  onChange = (e) => {
    const val = Number(e.target.value)
    this.setState({ 
      selected: val,
      active: !this.state.active,
      index: null
    })
  }

  onSelect = (e) => {
    const index = e.currentTarget.dataset.index
    const id = Number(e.currentTarget.dataset.id)
    this.setState({ 
      current: id,
      index: index
    })
  }

  replace(index, spacing) {
    let top = this.postions[index - 1].x
    const tryLeft = Math.floor(this.postions[index - 1].y + spacing + this.postions[index - 1].diameter + Math.random() * 15)
    const tryTop = Math.floor(this.postions[index - 1].x + spacing + this.postions[index - 1].diameter + Math.random() * 15)
    let left = tryLeft
    if (tryLeft + spacing > 300) {
      top = tryTop
      left = Math.floor(0 + Math.random() * 15)
      if (this.touching(top, left, spacing)) {
        console.log('colidiu ' + index)
        top += spacing
        left = tryLeft
      }
    }
    return { top : top , left: left }
  }
  touching(top, left, spacing) {
      for (let i = 0; i < this.postions.length; i++) {
        const element = this.postions[i]
        const r1 = element.diameter /2
        const r2 = spacing /2
        const distance = Math.sqrt((top - element.x) ** 2  + (left -element.y) ** 2);
        if (distance < r1 + r2) {
         return true
        }
      }
      return false
  }

  // Make function return only itens 
  renderGraphic = () => {
    this.postions = []
    return (
      this.props.data.map((data, idx) => {
        let diameter = data.size * 10
        diameter = diameter < 40 ? 40 : diameter > 100 ? 100 : diameter
        //let radius = diam / 2
        let size = 300 // component width and height
        let padding = 40 // component padding
        let spacing = diameter
        let  top = 0
        let  left = 0
        if (idx != 0) {
          let result = this.replace(idx, top, left, spacing)
          top = result.top
          left = result.left
        }
        this.postions.push({ x: top, y: left, diameter: diameter })
        let t = top
        let l = left
        return (
          <span
            key={idx}
            onClick={this.onSelect}
            data-index={idx}
            data-id={data.id}
            style={{
              backgroundImage: `url(/static/img/candidates/${data.slug}.png)`,
              backgroundColor: data.color,
              width: `${diameter}px`,
              height: `${diameter}px`,
              opacity: this.state.current === data.id ? 1 : .5,
              top: `${t}px`,
              left: `${l}px`,
            }}
          />
        )
      })
    )
  }

  // Make function return only itens 
  renderCandidate = () => {
    const data = this.props.data

    if (!data.length) {
      return null;
    }

    
    return (
      <div>

        <Slider
          className='nav'
          asNavFor={this.state.nav1}
          ref={ slider => ( this.slider2 = slider ) }

          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
        >

        {data.map((d, i) => {
          return (
            <div key={i} className='slider-nav'>
             <h1>{i}</h1>
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
          slidesToShow={1}
          slidesToScroll={1}
        >
          {data.map((d, i) => {
            return (

              <div className='slider-info' key={i}>
                <h1>{i}</h1>
                <p>{d.name}</p>
                <KeywordsCloud words={d.words} />
              </div>

            )
          })}

        </Slider>



      </div>
    )
  }

  render() {
    const data = this.props.data
    
    const current = this.state.current
    const selected = this.state.selected
    const candidate = this.state.index ? data[this.state.index] : []

    return (
      <div>
        <div className={css.selected}>
          <button value='1' onClick={this.onChange} className={selected === 1 ? css.disabled : null}>Gráfico</button>
          <button value='2' onClick={this.onChange} className={selected === 2 ? css.disabled : null}>Candidato</button>
        </div>

        <div className={css.content}>

          {!data.length ? null : <SliderThumbs data={data}/> }

          {/*selected === 1 ? <div className={css.graphic}>{this.renderGraphic()}</div> : selected === 2 ? <div className={css.candidate}>{this.renderCandidate()}</div> : null*/}
        
          <div className={this.state.index ? `${css.modal} ${css.open}` : `${css.modal}` }>
            
            <div className={css.container}>

              <div
                className={css.choose}
                style={{
                  backgroundImage: `url(/static/img/candidates/${candidate.slug}.png)`,
                  backgroundColor: candidate.color,
                  color: candidate.color
                }}
              />

              {candidate.words ? candidate.words.map((word, index) => {
                return (
                  <p key={index} className={css.teste}>
                    <span
                    style={{
                      color: candidate.color,
                      fontSize: word.size,
                      //fontSize: word.size > 20 ? 20 : word.size < 10 ? 10 : word.size
                    }}
                    >
                      {word.text}
                    </span>
                  </p>
                )
              }) : null}

            </div>

          </div>

        </div>
        {/*this.state.current ? <KeywordsCloud words={this.getWords()} /> : null*/}
      </div>
    )
  }
}

KeywordsFilter.propTypes = {
  children: PropTypes.node,
};

KeywordsFilter.defaultProps = {
  children: null,
};

export default KeywordsFilter;
