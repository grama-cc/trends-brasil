import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import css from './Modal.scss';

class Modal extends React.Component {

  closeModal = (e) => {
    this.props.closeModal()
  }

  getWords () {
    let array = this.props.data[this.props.index].words
    let sort_array = array.sort((a, b) =>  a.size - b.size)
    let reverse_array = sort_array.reverse()
    let slice_array = reverse_array.slice(0,8)

    return slice_array
  }

  render () {
    let data = this.props.data[this.props.index]
    let background = `/static/img/candidates/${data.slug}.png`
    let words = this.getWords()

    return (
      <div className={css.modal} onClick={this.closeModal}>
        <div className={css.container}>
          <div
            className={css.candidate}
            style={{
              backgroundImage: `url(${background})`,
              backgroundColor: data.color,
              color: data.color
            }}
          />
          {words.map((word, index) => (
            <p key={index}>
            <span
              style={{
                color: data.color,
                fontSize: `calc(${word.size}% + 10px)`
              }}
            >
              {word.text}
            </span>
            </p>
          ))}
        </div>
      </div>
    )
  }
}
export default Modal;
