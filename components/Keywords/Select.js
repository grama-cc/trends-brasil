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

  onChangeLang = (e) => {
    const lang = e.currentTarget.lang
    this.props.onChangeLang(lang)
  }

  render() {
    const val = this.props.val
    const content = this.props.content

    const lang = this.props.lang

    return (
      <div className={css.selected}>
        <button
          value='balls'
          onClick={this.onClick}
          disabled={val === 'balls'}
        >{i18n(content +'.graphic', lang)}
        </button>
        <button
          value='words'
          onClick={this.onClick}
          disabled={val === 'words'}
        >{i18n(content +'.candidate', lang)}
        </button>
      </div>
    )
  }
}

export default Select;
