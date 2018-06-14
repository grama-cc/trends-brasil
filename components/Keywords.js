import React from 'react';
import PropTypes from 'prop-types';
import css from './Keywords.scss';

import KeywordsFilter from './KeywordsFilter.js';

class Keywords extends React.Component {

  render() {

    const data = this.props.data

    return (
      <section className={css.keywords} {...this.props}>
        <div className={css.temp}>
          <h2>Por quem buscam</h2>
          <p>A popularidade dos candidatos na busca do Google.</p>
          <button>Saiba mais</button>
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
