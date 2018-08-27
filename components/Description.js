import React from 'react';
import PropTypes from 'prop-types';
import css from './Description.scss';

import Arrow from './Arrow.js';
import {i18n} from "../common/locale/i18n";

class Description extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  open = () => this.setState({ open: !this.state.open })

  onChangeLang = (e) => {
    const lang = e.currentTarget.lang
    this.props.onChangeLang(lang)
  }

  render() {

    const content = this.props.content;
    const lang = this.props.lang

    if (content) {
      return (
        <div className={css.description}>
          <h2>{i18n(`${content}.title`, lang)}</h2>
          <p>{i18n(`${content}.description`, lang)} <b>{i18n(`${content}.highlight`, lang)}</b></p>
          <button
            onClick={this.open}
            className={this.state.open ? css.open : null}
          >
            <span>{i18n(`${content}.button`, lang)}</span>
            <Arrow arrowColor={this.props.arrowColor}/>
          </button>

          <div 
            className={this.state.open ? `${css.more} ${css.open}` : css.more}
            style={{
              backgroundColor: this.props.color ? this.props.color : '#fff'
            }}
          >
            {i18n(`${content}.more`, lang).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      )
    } else {
      return (<div><p>Erro</p></div>)
    }
  }
}

export default Description;
