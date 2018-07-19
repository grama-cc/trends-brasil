import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';
import Api from '../lib/Api';

class Cloud extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      word: null,
      candidate: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const word = await Api.get('/word/');
    const candidate = await Api.get('/candidate/');
    this.setState({ word, candidate });
  }

  // Filtro por categoria
  getWordsPerCategory = (word) => {
    const candidate = this.state.candidate;
    const id = this.props.category || [];

    const objects = word.reduce((group, item) => {

      let type = this.props.type === 'candidate' ? item.candidate : item.category

      group[type] = group[type] || [];
      group[type].push(item);
      return group;

    }, Object.create(null));

    const list = objects[id] || [];

    const words = list.map((w) => {
      const array = candidate.find((c) => c.id === w.candidate);
      return {
        "color": array.color,
        "size": w.size,
        "word": w.text,
        "query": w.query_text.replace(/ /g,"+")
      }
    });

    return words
  }

  render() {
    if (!this.state.word && !this.state.candidate) {
      return <div>Loading...</div>
    }

    const words = this.getWordsPerCategory(this.state.word);

    return (
      <div {...this.props} className={css.cloud}>
        {words.map((word, index) => (
          <div key={index}>
            <a
              href={`https://www.google.com.br/search?q=${word.query}`}
              target="_blank"
              style={{
                fontSize: `calc(${word.size}% + 1vw * ${word.size/100} + 10px)`,
                color: word.color
              }}
            > 
              {word.word}
            </a>
          </div>
        ))}
      </div>
    )
  }
}

export default Cloud;
