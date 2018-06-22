import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Select.scss';

import SliderThumbs from './SliderThumbs.js';

class Select extends React.Component {

  onChange = (e) => {
    let val = Number(e.target.value)
    this.props.change(val)
  }

  render() {

    let val = this.props.val

    return (
      <div>
        <div className={css.selected}>
          <button
            value={1}
            onClick={this.onChange}
            className={val === 1 ? css.disabled : null}
          >
            Gráfico
          </button>
          <button
            value={2}
            onClick={this.onChange}
            className={val === 2 ? css.disabled : null}
          >
            Candidato
          </button>
        </div>
      </div>
    )
  }
}

export default Select;
