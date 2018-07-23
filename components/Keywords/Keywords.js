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
      candidate: null,
      id: null
    }
  }

  componentDidMount() {
    this.getData();
  }

  onChange = (val) => {
    this.setState({ 
      selected: val,
    })
  }

  onClick = (val) => {
    this.setState({ 
      id: val,
    })
  }

  getData = async () => {
    const candidate = await Api.get('/candidate.json');
    this.setState({ candidate });
  }

  render() {

    if(!this.state.candidate) {
      return <div>Loading</div>
    }

    const data = this.state.candidate;
    const selected = this.state.selected;

    return (
      <section className={css.keywords} {...this.props} id="keywords">
        <Description content={content.description} />
        <Media query="(max-width: 800px)">
          {matches =>
            matches ? (
              <div>
                <Select
                  change={this.onChange}
                  val={selected}
                  content={content.select}
                />

                <Graphic
                  data={data}
                  click={this.onClick}
                  id={this.state.id}
                  val={selected}
                  
                /> 
                {selected === 2 ?
                <Candidate
                  data={data}
                  id={this.state.id}
                  val={selected}
                  
                /> : null}

              </div>
            ) : (
              <div className={css.container}>
                <Candidate data={data} />
                <Graphic data={data} />
              </div>
            )
          }
        </Media>
        <Social stroke="#B4B4B4" />
      </section>
    )
  }
}

export default Keywords;
