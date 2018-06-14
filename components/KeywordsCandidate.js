import React from 'react';
import PropTypes from 'prop-types';
import css from './KeywordsCandidate.scss';


class KeywordsCandidate extends React.Component {


  render() {
    const data = this.props.data
    const current = this.props.candidate

    return (
      <div {...this.props} className={css.candidate}>
        {data.map((data, idx) => {
          return (
            <span 
              key={idx}
              style={{
                backgroundColor: data.color,
                width: `${data.size}px`,
                height: `${data.size}px`,
                opacity: current === data.id ? 1 : .5
              }}
              data-id={data.id}
              onClick={() => this.props.onSelect(this.props)}
            >
            </span>
          )
        })}
      </div>
    )
  }

  //onChange = () => {
    //this.props.taina(this.props.index)
  //}
}

KeywordsCandidate.propTypes = {
  children: PropTypes.node,
};

KeywordsCandidate.defaultProps = {
  children: null,
};

export default KeywordsCandidate;
