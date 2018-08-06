import React from 'react';
import PropTypes from 'prop-types';
import css from './Description.scss';
import { i18n } from '../common/locale/i18n';

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

    return (
      <div className={css.description}>

        <h2>{i18n(content + '.title')}</h2>
        <p>{i18n(content + '.description')}</p>

        <button
          onClick={this.open}
          className={this.state.open ? css.open : null}
        >
          {i18n(content + '.button')}
        </button>

        <div className={this.state.open ? `${css.more} ${css.open}` : css.more}>
          {i18n(content + '.more').map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        
      </div>
    )
  }
}

Description.propTypes = {
  content: PropTypes.object
};

Description.defaultProps = {
  content: {}
};

export default Description;
