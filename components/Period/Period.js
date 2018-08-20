import React from 'react';
import PropTypes from 'prop-types';

import css from './Period.scss';
import content from '../../static/json/geral.json'

import Arrow from '../Arrow.js';

class Period extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      val: 'week'
    };
  }

  onClick = (e) => {
    let val = e.target.value
    console.log(val)
    this.setState({val: val})
  }

  onDropdown = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const val = this.state.val;
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
          <p> {this.state.val === 'week' ? content.buttons.week : content.buttons.month} </p>
          <Arrow arrowColor={this.props.arrowColor} />
        </li>

        <div className={`${css.dropdown} ${this.state.open ? css.open : null}`}>
          <li>
            <button
              onClick={this.onClick}
              value='week'
              disabled={val === 'week'}
              style={{ 
                color: val === 'week' ? this.props.color : '#4b4b4b',
              }}
            >
              {content.buttons.week}
            </button>
          </li>
          <li>
            <button
              onClick={this.onClick}
              value='month'
              disabled={val === 'month'}
              style={{ 
                color: val === 'month' ? this.props.color : '#4b4b4b',
              }}
            >
              {content.buttons.month}
            </button>
          </li>
        </div>

      </ul>
    )
  }
}

export default Period;
