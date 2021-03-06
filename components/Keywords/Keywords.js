import React from 'react';
import css from './Keywords.scss';

import Period from '../Period/Period.js';

import Description from '../Description/Description.js';
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

    if(!this.props.candidates || !this.props.words || !this.props.load) {

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

            round={this.props.round}
            //onClickRound={this.props.onClickRound}
          />
          <Candidate
            val={view}
            candidates={this.props.candidates}
            words={this.props.words}
            onFilter={this.props.onFilter}
            filter={this.props.filter}
            content='keywords'
            lang={this.props.lang}

            round={this.props.round}
            // onClickRound={this.props.onClickRound}


          />
        </React.Fragment>
      )

    }
  }

  render() {
    const candidates = this.props.candidates
    const words = this.props.words
    const view = this.state.view;
    const lang = this.props.lang
    
    return (
      <section className={css.keywords} id='keywords'>
        <div className={css.info}>
          <Description
            content='keywords'
            arrowColor={this.props.arrowColor}
            lang={lang}
            color='#f8f8f8'
          />
        </div>
        <div className={css.container}>
          <Select
            click={this.onChangeView}
            val={view}
            content='keywords.select'
            lang={lang}
          />
          { this.renderChart(candidates, words, view) }
        </div>
        <Social 
          stroke='#b4b4b4' 
          bottom
          parent="Graphic_graphic_IWdTV"
          id='keywords'
          zip='/static/img/candidates.zip'
          lang={lang}
        />
      </section>
    )
  }
}

export default Keywords;
