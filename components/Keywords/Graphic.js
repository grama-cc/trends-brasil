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

  render () {
    const data = this.props.data
    return (
      <div className={css.graphic}>
        {data.map((data, idx) => {
          let diameter = data.size * 10

          diameter = diameter < 40 ? 40 : diameter > 100 ? 100 : diameter

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
                top: `${data.top}px`,
                left: `${data.left}px`,
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
