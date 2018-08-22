import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Select.scss';

class Select extends React.Component {

  onClick = (e) => {
    const val = e.target.value
    this.props.click(val)
  }

  render() {
    const val = this.props.val
    const content = this.props.content

    return (
      <div className={css.selected}>
        <button
          value='bars'
          onClick={this.onClick}
          disabled={val === 'bars'}
        >
          Gráfico
        </button>
        <button
          value='terms'
          onClick={this.onClick}
          disabled={val === 'terms'}
        >
          Termos
        </button>
      </div>
    )
  }
}

export default Select;
