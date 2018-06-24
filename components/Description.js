import React from 'react';
import PropTypes from 'prop-types';
import css from './Description.scss';

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

        <h2>{content.title}</h2>
        <p>{content.description}</p>

        <button
          onClick={this.open}
          className={this.state.open ? css.open : null}
        >
          {content.button}
        </button>

        <div className={this.state.open ? `${css.more} ${css.open}` : css.more}>
          {content.more.map((text, index) => (
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
