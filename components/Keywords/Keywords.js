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
      view: "balls",
      ballsData: null,
      wordsData: null,
      // id: null vem do pai
    }
  }

  onChangeView = (val) => {
    this.setState({ view: val })
  }

  //onChangeFilter = (val) => {
    //this.props.onFilter(val)
    //this.setState({ id: val })
  //}

  getData = async () => {
    const candidate = await Api.getCandidate();
    const word = await Api.getWord();
    this.setState({ candidate, word });
  }

  componentDidMount() {
    this.getData();
  }


  render() {

    if(!this.state.ballsData && !this.state.wordsData) {
      return <div className={css.loading}>Loading...</div>
    }

    const view = this.state.view;
    const data = {
      'candidate': this.state.candidate,
      'word': this.state.word
    }

    return (
      <section className={css.keywords} {...this.props} id="keywords">
        <Description content={content.description} />
          <Select // mudar para view
            change={this.onChangeView}
            val={view}
            content={content.select}
          />
          <Graphic // Balls
            data={data.candidate}
            onFilter={this.props.onFilter}
            filter={this.props.filter}
            //className={} fazer um liga desliga via css this.props.view
          />
          <Candidate // Words
            data={data}
            onFilter={this.props.onFilter}
            filter={this.props.filter}
          />
        <Social stroke={`#b4b4b4`} />
      </section>
    )
  }
}

export default Keywords;
