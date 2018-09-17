import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';
import Api from '../../lib/Api';

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

  render() {
    let words = this.getWords();

    words = words.slice(0, 20);

    return (
      <div className={css.cloud} type={this.props.type}>
        {words.map((word, idx) => {

          let size =  word.size * (screen.width < 800 ? 30 : 100)/100; 

          if (size > 100) {
            size = 100;
          } else {
            size = size;
          }
          
          let styleSheet = document.styleSheets[0];
          let keyframes = `
            @keyframes animation {
              0% {
                //opacity: 0;
                left: -100vw;
              }
              100% {
                //opacity: 1;
                left: 0;
              }
            }`;
          styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
          let style = {
            animationName: `animation`,
            fontSize: `calc( ${size}px + 12px)`,
            color: this.props.color ? this.props.color : word.color,
            // opacity: 0,
            animationDelay: `${ .2 * idx/5}s`
            //animationDelay: `${ ((Math.floor(Math.random() * (2 - 1 + 1) + 1))) * idx/5}s`
          };
          
          return(
            <a
              key={idx}
              href={`https://www.google.com.br/search?q=${word.query_text.replace(/ /g,"+")}`}
              target="_blank"
              style={style}
            > 
              {`${word.text} `}
            </a>
          )
        })}
      </div>
    )
  }
}

export default Cloud;
