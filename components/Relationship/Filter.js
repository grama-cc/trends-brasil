import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Filter.scss';

class Filter extends React.Component {

  onFilter = (e) => {
    let id = Number(e.target.value)
    this.props.onfilter(id)
  }

  onCompare = (e) => {
    let id = Number(e.target.value)
    this.props.oncompare(id)
  }

  render() {
    const id = this.props.id;
    const candidates = this.props.candidates;

    console.log(this.props.filter, this.props.compare)

    return (
      <div className={css.filter}>

        <ul className={css.selected}>
          {candidates.map((c, idx) => (
            <li 
              key={idx}
              value={c.id}
              onClick={this.onFilter}
              className={this.props.filter === c.id ? css.disabled : null}
            >
              {c.name}
            </li>
          ))}
        </ul>

        <ul className={css.selected}>
          {candidates.map((c, idx) => (
            <li 
              key={idx}
              value={c.id}
              onClick={this.onCompare}
              className={this.props.compare === c.id ? css.disabled : null}
            >
              {c.name}
            </li>
          ))}
        </ul>

      </div>
    )
  }
}

export default Filter;
