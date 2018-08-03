import React from 'react';
import PropTypes from 'prop-types';
import Media from "react-media";

import css from './Keywords.scss';
import content from '../../static/json/keywords.json'

import Description from '../Description.js';
import Select from './Select.js';
import Candidate from './Candidate.js';
import Graphic from './Graphic.js';
import Social from '../Social/Social.js';

import Api from '../../lib/Api';

class Keywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 1,
      id: null
    }
  }

  onChange = (val) => {
    this.setState({ selected: val })
  }

  onClick = (val) => {
    this.setState({ id: val })
  }

  renderGraphic(data, current) {
    return (
      <Graphic
        data={data}
        click={this.onClick}
        id={this.state.id}
        val={current}
      />
    )
  }

  renderCandidate(data, current) {
    return (
      <Candidate
        data={data} 
        id={this.state.id}
        val={current}
      />
    )
  }

  render() {

    if(!this.props.candidates && !this.props.words) {
      return <div className={css.loading}>Loading...</div>
    }

    const candidates = this.props.candidates
    const words = this.props.words

    const selected = this.state.selected;

    return (
      <section className={css.keywords} {...this.props} id="keywords">
        <Description content={content.description} />
        <Media query="(max-width: 800px)">
          {matches => matches ? (
            <div>
              <Select
                change={this.onChange}
                val={selected}
                content={content.select}
              />
              { this.renderGraphic(candidates, selected) }
              { /*selected === 2 ? this.renderCandidate(data, selected) : null*/ }
            </div>
          ) : ( 
            <div className={css.container}>
              { /*this.renderCandidate(data, selected)*/ }
              { this.renderGraphic(candidates, selected) }
            </div>
          )}
        </Media>
        {/*<Social stroke={`#b4b4b4`} />*/}
      </section>
    )
  }
}

export default Keywords;
