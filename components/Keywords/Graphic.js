import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import css from './Graphic.scss';

class Graphic extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      index: null,
    }
  }

  onSelect = (e) => {
    const index = e.currentTarget.dataset.index
    this.setState({ 
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

  render() {
    const data = this.props.data
    const candidate = this.state.index ? data[this.state.index] : []

    return (
      <div className={css.content}>

        <div className={css.graphic}>{this.renderGraphic()}</div>
      
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
                    fontSize: word.size > 20 ? 20 : word.size < 10 ? 10 : word.size
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

    )
  }
}

Graphic.propTypes = {
  children: PropTypes.node,
};

Graphic.defaultProps = {
  children: null,
};

export default Graphic;
