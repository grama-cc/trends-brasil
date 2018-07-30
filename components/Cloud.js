import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';
import Api from '../lib/Api';

class Cloud extends React.Component {

  // Reorder by category or candidate
  getWords = () => {
    const data = this.props.data;
    const candidate = data.candidate;
    const word = data.word;
    const id = this.props.id || [];
    
    const objects = word.reduce((group, item) => {
      let type = this.props.type === 'candidate' ? item.candidate : item.category
      group[type] = group[type] || [];
      group[type].push(item);
      return group;
    }, Object.create(null));

    const list = objects[id] || [];

    return list
  }

  render() {

    const words = this.getWords();

    return (
      <div {...this.props} className={css.cloud}>
        {words.map((word, index) => (
          <div key={index}>
            <a
              href={`https://www.google.com.br/search?q=${word.query_text.replace(/ /g,"+")}`}
              target="_blank"
              style={{
                fontSize: `calc(${word.size}% + 1vw * ${word.size/100} + 10px)`,
                color: word.color
              }}
            > 
              {word.text}
            </a>
          </div>
        ))}
      </div>
    )
  }
}

export default Cloud;
