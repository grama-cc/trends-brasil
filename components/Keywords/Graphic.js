import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import css from './Graphic.scss';

import Api from '../../lib/Api';

class Graphic extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      id: null,
      active: false,
      word: null,
      index: null
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const word = await Api.get('/word.json');
    this.setState({ word });
  }

  onSelect = (e) => {
    this.setState({ 
      id: e.currentTarget.dataset.id,
      active: true,
      index: e.currentTarget.dataset.index
    });
  }

  getWords () {
    const words = this.state.word.filter((w) => { 
      return this.state.id == w.candidate;
    });

    const slice_array = words.slice(0, 8);
    return slice_array
  }

  renderModalWords () {
    const words = this.getWords();
    const color = this.props.data[this.state.index].color;

    return (
      <div className={css.modal}>
        {words.map((word, index) => (
          <p key={index}>
            <span
              style={{
                color: color,
                fontSize: `16px`,
                // fontSize: `calc(${word.size}% + 10px)`
              }}
            >
              {word.text}
            </span>
          </p>
        ))}
      </div> 
    )
  }

  render () {
    if (!this.props.data) {
      return <div>Loading...</div>
    }
    const data = this.props.data

    return (
      <div className={css.graphic}>
        {data.map((data, idx) => {
          const id = this.state.id
          let diameter = data.size * 10;
          diameter = diameter < 40 ? 40 : diameter > 100 ? 100 : diameter;
          return (
            <span
              key={idx}
              onClick={this.onSelect}
              data-id={data.id}
              data-index={idx}
              className={id == data.id ? css.modal : null}
              style={{
                backgroundImage: `url(/static/img/candidates/${data.slug}.png)`,
                backgroundColor: data.color,
                width: `${id == data.id ? 110 : diameter}px`,
                height: `${id == data.id ? 110 : diameter}px`,
                opacity: id == data.id ? 1 : .3,
                top: id == data.id ? `${50}%` : `${data.top}px`,
                left: id == data.id ? `${50}%` : `${data.left}px`,
              }}
            />
          )
        })}

        {this.state.active ? this.renderModalWords() : null}
      </div>
    )
  }
}
export default Graphic;
