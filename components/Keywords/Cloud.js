import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';
import Api from '../../lib/Api';

class Cloud extends React.Component {

  getWords = () => {
    const words = this.props.words;
    const id = this.props.id || [];
    
    const objects = words.reduce((group, item) => {
      let type = item.candidate
      group[type] = group[type] || [];
      group[type].push(item);
      return group;
    }, Object.create(null));

    const list = objects[id] || [];
    return list
  }

  render() {
    let words = this.getWords();

    return (
      <div className={css.cloud}>
        {words.map((word, idx) => {
          let size =  word.size * ( screen.width < 800 ? 30 : 100 ) / 100; 

          if (size > 100) {
            size = 100;
          } else {
            size = size;
          }

          const candidate = this.props.candidates.filter((c) => word.candidate === c.id);
          
          return(
            <a
              key={idx}
              href={`https://www.google.com.br/search?q=${word.query_text.replace( / /g,"+" )}`}
              target="_blank"
              style={{
                fontSize: word.candidate === candidate[0].id ? `calc( ${size}px + 12px)` : '0px',
                color: word.color,
                opacity: word.candidate === candidate[0].id ? 1 : 0
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
