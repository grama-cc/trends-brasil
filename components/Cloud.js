import React from 'react';
import PropTypes from 'prop-types';
import css from './Cloud.scss';
import Api from '../lib/Api';

class Cloud extends React.Component {


  constructor (props) {
    super(props)
    this.width = 100;

    // this.myInput = React.createRef()

  }

  componentDidMount () {
    // let oi = document.getElementsByTagName('a').offsetWidth;
    // console.log(oi)

    //console.log(this.myInput.current.clientHeight)
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
    // let oi = document.getElementsByTagName('a').innerWidth();
    
    return (
      <div className={css.cloud} type={this.props.type}>
        {words.map((word, idx) => {

          const font = this.props.keywords ? `calc(2vw * ${word.size/100} + 14px)` : `calc(2vw * ${word.size/100} + 12px)`

          return(
            <a
              ref={(ref) => this.myInput = ref}
              key={idx}
              href={`https://www.google.com.br/search?q=${word.query_text.replace(/ /g,"+")}`}
              target="_blank"
              style={{
                fontSize: font,
                color: this.props.color ? this.props.color : word.color,
                left: `${ this.props.keywords ? 0 : this.isOdd(idx) === 0 ? - (6 * idx) - 20 : (idx * 4) + 20 }px`
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
