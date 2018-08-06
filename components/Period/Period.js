import React from 'react';
import PropTypes from 'prop-types';

import css from './Period.scss';

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
        className={css.period}
        style={{
          background: this.props.bgColor
        }}
      >
        <li className={css.choose} >
          <span 
            style={{ 
              color: this.props.color,
              borderColor: this.props.color
            }}>
            Período:
          </span>
          <p> {this.state.val === 'week' ? 'Semana' : 'Mês'} </p>
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
              Semana
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
              Mês
            </button>
          </li>
        </div>

      </ul>
    )
  }
}

export default Period;
