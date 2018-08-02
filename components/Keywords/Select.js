import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Select.scss';

class Select extends React.Component {

  onClick = (e) => {
    const val = Number(e.target.value)
    this.props.change(val)
  }

  render() {

    const val = this.props.val
    const content = this.props.content

    return (
      <div className={css.selected}>
        <button
          value={1}
          onClick={this.onClick}
          className={val === 1 ? css.disabled : null}
        >
          {content.graphic} 
        </button>
        <button
          value={2}
          onClick={this.onClick}
          className={val === 2 ? css.disabled : null}
        >
          {content.candidate}
        </button>
      </div>
    )
  }
}

Select.propTypes = {
  content: PropTypes.object
};

Select.defaultProps = {
  content: {}
};

export default Select;
