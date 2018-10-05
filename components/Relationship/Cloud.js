import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';

class Cloud extends React.Component {

  render() {
    const words = this.props.words.words;
    const color = this.props.words.color
    
    let maxValue = 0;

    words.forEach((el)=> {
      el.size > maxValue ? maxValue = el.size : null;
    });

    return (
      <div className={css.cloud} type={this.props.type}>
        {words.map((word, idx) => {

          const size = word.size * (screen.width < 800 ? 10 : 20) / maxValue;

          return(
            <a
              key={idx}
              href='javascript:void(0)'
              target="_blank"
              style={{
                fontSize: `calc( ${size}px + 12px)`,
                color: color,
                left: `${ this.props.keywords ? 0 : 
                  this.props.position == 'left' ?
                    Math.floor(Math.random() * 40) + 10
                  : Math.floor(Math.random() * 45) + 20
                }%`,
                transform: `${word.size * 40 / maxValue > 30 ? 'translateX(-20%)' : ''}`
              }}
            > 
              {word.text}
            </a>
          )
        })}
      </div>
    )
  }
}

export default Cloud;
