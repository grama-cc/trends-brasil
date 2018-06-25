import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import css from './Graphic.scss';

import Modal from './Modal.js'

class Graphic extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      index: null,
      active: false
    }
    this.positions = []
    this.maxHeight = 0
  }

  onSelect = (e) => {
    this.setState({ 
      index: e.currentTarget.dataset.index,
      active: true
    })
  }

  closeModal = () => {
    this.setState({ active: false })
  }

  replace(index, diameter) {
    let left = Math.floor(this.positions[index-1].y + this.positions[index-1].diameter + Math.random() *15)
    let top = Math.floor(this.maxHeight - diameter * Math.random())
    top = top < 0 ? 0 : top
    if (left > 300 - diameter){
     // top = this.maxHeight + Math.floor(Math.random() * 15)
     top =  Math.floor(this.positions[index-1].x + this.positions[index-1].diameter + Math.random() *15)
     this.maxHeight = diameter + top
     left = 15
    }
    this.maxHeight = this.maxHeight < (diameter) ? (top + diameter) : this.maxHeight
    if (this.touching(top, left, diameter)){
      top += 20
      left += 20
    }
    return { top : top , left: left }
  }

  touching(top, left, spacing) {
    for (let i = 0; i < this.positions.length; i++) {
      const element = this.positions[i]
      const r1 = element.diameter /2
      const r2 = spacing /2
      const distance = Math.sqrt((top - element.x) ** 2  + (left -element.y) ** 2);
      if (distance < r1 + r2) {
       return true
      }
    }
    return false
  }

  render () {
    const data = this.props.data
    return (
      <div className={css.graphic}>
        {data.map((data, idx) => {
          let diameter = data.size * 10
          diameter = diameter < 40 ? 40 : diameter > 100 ? 100 : diameter
          let size = 300 // component width and height
          let top = 15
          let left = 15
          if (idx != 0) {
            let result = this.replace(idx, diameter)
            top = result.top
            left = result.left
          }
          this.positions.push({ x: top, y: left, diameter: diameter })
          let t = top
          let l = left
          return (
            <span
              key={idx}
              onClick={this.onSelect}
              data-id={data.id}
              data-index={idx}
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
        })}
        {this.state.active ? 
          <Modal
            index={this.state.index}
            data={data}
            closeModal={this.closeModal}
          /> 
        : null}
      </div>
    )
  }
}
export default Graphic;
