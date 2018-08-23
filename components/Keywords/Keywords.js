import React from 'react';
import css from './Keywords.scss';

import Period from '../Period/Period.js';

import Description from '../Description.js';
import Select from './Select.js';
import Candidate from './Candidate.js';
import Graphic from './Graphic.js';
import Social from '../Social/Social.js';

class Keywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'balls',
    }
  }

  onChangeView = (val) => {
    this.setState({ view: val })
  }

  renderChart(candidates, words, view) {

    if(!this.props.candidates && !this.props.words) {

      return <div className={css.loading}>Loading...</div>
    } else {
      return (
        <React.Fragment>
          <Graphic
            val={view}
            candidates={this.props.candidates}
            words={this.props.words}
            onFilter={this.props.onFilter} 
            filter={this.props.filter}
            lang={this.props.lang}
          />
          <Candidate
            val={view}
            candidates={this.props.candidates}
            words={this.props.words}
            onFilter={this.props.onFilter}
            filter={this.props.filter}
            content='keywords'
            lang={this.props.lang}
          />
        </React.Fragment>
      )
    }
  }

  render() {

    const candidates = this.props.candidates
    const words = this.props.words
    const view = this.state.view;
    return (
      <section className={css.keywords} id='keywords'>
        <div className={css.info}>
          <Description
            content='keywords'
            arrowColor={this.props.arrowColor}
            lang={this.props.lang}
          />
        </div>
        <div className={css.container}>
          <Select
            click={this.onChangeView}
            val={view}
            content='keywords.select'
            lang={this.props.lang}
          />
          { this.renderChart(candidates, words, view) }
        </div>

        <Period 
          bgColor='#f8f8f8'
          color='#b4b4b4'
          bottom
          arrowColor={this.props.arrowColor}
        />
        <Social stroke='#b4b4b4' bottom />
      </section>
    )
  }
}

export default Keywords;
