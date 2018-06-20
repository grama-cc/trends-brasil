import React from 'react';
import PropTypes from 'prop-types';
import css from './Keywords.scss';

import KeywordsFilter from './KeywordsFilter.js';

class Keywords extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  open = () => this.setState({ open: !this.state.open })


  render() {

    const data = this.props.data

    return (
      <section className={css.keywords} {...this.props}>

        <div className={css.content}>
          <h2>Por quem buscam</h2>
          <p>A popularidade dos candidatos na busca do Google.</p>

          <button onClick={this.open} className={this.state.open ? css.open : null}>Saiba mais</button>

          <div className={this.state.open ? `${css.more} ${css.open}` : css.more}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>

        <KeywordsFilter data={data} />

      </section>
    )
  }
}

Keywords.propTypes = {
  children: PropTypes.node,
};

Keywords.defaultProps = {
  children: null,
};

export default Keywords;
