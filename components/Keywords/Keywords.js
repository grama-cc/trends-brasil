import React from 'react';
import PropTypes from 'prop-types';
import css from './Keywords.scss';
import content from '../../static/content/keywords.json'

import Description from '../Description.js';
import Select from './Select.js';

import KeywordsFilter from './KeywordsFilter.js';

class Keywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 1,
    }
  }

  onChange = (val) => {
    this.setState({ 
      selected: val,
    })
  }

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

        <Select change={this.onChange} val={this.state.selected} />

        {this.state.selected}

        {/*<KeywordsFilter data={data} />*/}

      </section>
    )
  }
}

export default Keywords;
