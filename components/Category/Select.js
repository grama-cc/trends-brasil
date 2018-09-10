import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Select.scss';

import {i18n} from "../../common/locale/i18n";

class Select extends React.Component {

  onClick = (e) => {
    const val = e.target.value
    this.props.click(val)
  }

  render() {
    const val = this.props.val
    const lang = this.props.lang

    return (
      <div className={css.selected}>
        <button
          value='bars'
          onClick={this.onClick}
          disabled={val === 'bars'}
        >
          {i18n('select.graphic', lang)}
        </button>
        <button
          value='terms'
          onClick={this.onClick}
          disabled={val === 'terms'}
        >
          {i18n('select.terms', lang)}
        </button>
      </div>
    )
  }
}

export default Select;
