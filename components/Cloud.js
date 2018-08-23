import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';
import Api from '../lib/Api';

class Cloud extends React.Component {
  constructor (props) {
    super(props)
    this.width = 100;
  }

  // Reorder by category or candidate
  getWords = () => {
    const candidates = this.props.candidates
    const words = this.props.words;
    const id = this.props.id || [];
    
    const objects = words.reduce((group, item) => {
      let type = this.props.type === 'candidate' ? item.candidate : item.category
      group[type] = group[type] || [];
      group[type].push(item);
      return group;
    }, Object.create(null));

    const list = objects[id] || [];

    return list
  }

  isOdd = (num) => { return num % 2;}


  render() {
    const words = this.getWords();
    let maxValue = 0;
    words.forEach((el)=> {
      el.size > maxValue ? maxValue = el.size : null;
    });

    return (
      <div className={css.cloud} type={this.props.type}>
        {words.map((word, idx) => {

          const size = this.props.keywords ? word.size*(screen.width < 800 ? 12 : 40)/maxValue : word.size*(screen.width < 800 ? 10 : 30)/maxValue; 

          return(
            <a
              key={idx}
              href={`https://www.google.com.br/search?q=${word.query_text.replace(/ /g,"+")}`}
              target="_blank"
              style={{
                //fontSize: `calc( ${word.size*(screen.width < 800 ? 5 : 30)/maxValue}px + 12px)`,
                fontSize: `calc( ${size}px + 12px)`,
                color: this.props.color ? this.props.color : word.color,
                left: `${ this.props.keywords ? 0 : 
                  this.props.position == 'left' ?
                    Math.floor(Math.random() * 40) + 10
                  : Math.floor(Math.random() * 45) + 20
                }%`,
                transform: `${word.size*40/maxValue > 30 ? 'translateX(-20%)' : ''}`
              }}
            > 
              {`${word.text} `}
              
            </a>
        )})}
      </div>
    )
  }
}

export default Cloud;
