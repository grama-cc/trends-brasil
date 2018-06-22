import React from 'react';
import PropTypes from 'prop-types';
import css from './Keywords.scss';

import content from '../../static/content/keywords.json'

import KeywordsFilter from './KeywordsFilter.js';
import Description from '../Description.js';

class Keywords extends React.Component {

  render() {
    const data = this.props.data

    return (
      <section className={css.keywords} {...this.props}>

        <Description
          title={content.title}
          description={content.description}
          more={content.more}
          button={content.button}
        />

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
