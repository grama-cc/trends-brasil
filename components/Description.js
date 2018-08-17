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

  render() {

      const content = this.props.content
      if (content) {
          return (
              <div className={css.description}>


                  <h2>{i18n(content + '.title', null)}</h2>
                  <p>{i18n(content + '.description', null)}</p>

                  <button
                      onClick={this.open}
                      className={this.state.open ? css.open : null}
                  >
                      <span>{i18n(content + '.button', null)}</span>
                      <Arrow arrowColor={this.props.arrowColor}/>
                  </button>

                  <div className={this.state.open ? `${css.more} ${css.open}` : css.more}>
                      {i18n(content + '.more', null).map((text, index) => (
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

Description.propTypes = {
  content: PropTypes.object
};

Description.defaultProps = {
  content: {}
};

export default Description;
