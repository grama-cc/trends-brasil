import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';
import Api from '../../lib/Api';

class Cloud extends React.Component {
  // Reorder by category
  getWords = () => {
    const words = this.props.words;
    const id = this.props.id || [];
    const objects = words.reduce((group, item) => {
      let type = item.category
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
      <div className={css.cloud} type={this.props.type}>
        {words.map((word, idx) => {

          const percent = word.size / 100
          let size = word.size * ( screen.width < 800 ? 30 : 150 ) / 100;

          if (size > 100) {
            size = 100 * percent;
          } else {
            size = size;
          }

          return(
            <a
              key={idx}
              href={`https://www.google.com.br/search?q=${word.query_text.replace(/ /g,"+")}`}
              target="_blank"
              style={{
                fontSize: `calc( ${size}px + 12px)`,
                color: this.props.color ? this.props.color : word.color,
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
