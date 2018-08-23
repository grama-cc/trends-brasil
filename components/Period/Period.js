import React from 'react';
import PropTypes from 'prop-types';

import css from './Period.scss';
import content from '../../static/json/geral.json'

import Arrow from '../Arrow.js';

/*

  'now 1-d', 'today',
  'now 7-d', 'week',
  'today 1-m', 'month',
  'today 1-y', 'year',
  Por default funciona por mes

*/

class Period extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      //val: 'month'
    };
  }

  onClick = (e) => {
    let period = e.target.value

    this.props.onClickPeriod(period)
    //this.setState({val: val})
  }

  onDropdown = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const period = this.props.period;

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
            {content.buttons.period}:
          </span>
          <p> {period === 'week' ? content.buttons.week : content.buttons.month} </p>
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
              {content.buttons.month}
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
              {content.buttons.week}
            </button>
          </li>
        </div>

      </ul>
    )
  }
}

export default Period;
