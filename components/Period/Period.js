import React from 'react';
import PropTypes from 'prop-types';

import css from './Period.scss';
// import content from '../../static/json/geral.json'

import {i18n} from '../../common/locale/i18n';

import Arrow from '../Arrow.js';

/*
  'now 1-d', 'today',
  'now 7-d', 'week',
  'today 1-m', 'month',
  'today 1-y', 'year',
  Default - month
*/

class Period extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onClick = (e) => {
    let period = e.target.value
    this.props.onClickPeriod(period)
  }

  onDropdown = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const period = this.props.period;
    const lang = this.props.lang

    return (
      <ul
        onClick={this.onDropdown}
        className={`${css.period} ${this.props.bottom ? css.bottom : null} ${this.props.all ? css.all : null}`}
        style={{
          background: this.props.bgColor
        }}
      >
        <li
          className={css.choose}
          style={{borderColor: this.props.color}}
        >
          <span style={{ color: this.props.color }}>
            {i18n('period.title', lang)}:
          </span>
          <p> {period === 'week' ? i18n('period.week', lang) : i18n('period.month', lang)} </p>
          <Arrow arrowColor={this.props.arrowColor} />
        </li>

        <div 
          className={`${css.dropdown} ${this.state.open ? css.open : null}`}
          style={{ background: this.props.bgColor }}
        >

          <li>
            <button
              onClick={this.onClick}
              value='month'
              disabled={period === 'month'}
              style={{ 
                color: period === 'month' ? this.props.color : '#4b4b4b',
              }}
            >
              {i18n('period.month', lang)}
            </button>
          </li>
          <li>
            <button
              onClick={this.onClick}
              value='week'
              disabled={period === 'week'}
              style={{ 
                color: period === 'week' ? this.props.color : '#4b4b4b',
              }}
            >
              {i18n('period.week', lang)}
            </button>
          </li>
        </div>

      </ul>
    )
  }
}

export default Period;
