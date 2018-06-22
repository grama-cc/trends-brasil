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
    return (
      <div className={css.description}>

        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>

        <button
          onClick={this.open}
          className={this.state.open ? css.open : null}
        >
          {this.props.button}
        </button>

        <div className={this.state.open ? `${css.more} ${css.open}` : css.more}>
          {this.props.more.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        
      </div>
    )
  }
}

Description.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.string,
  more: PropTypes.array,
};

Description.defaultProps = {
  title: '',
  description: '',
  button: '',
  more: []
};

export default Description;
