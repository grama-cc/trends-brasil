import React from 'react';
import PropTypes from 'prop-types';
import css from './Relationship.scss';
import Api from '../../lib/Api';
import content from '../../static/json/relationship.json';

import Description from '../Description.js';
import Social from '../Social.js';

import Filter from './Filter.js';

class Relationship extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidate: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const candidate = await Api.get('/candidate.json');
    this.setState({ candidate });
  }

  render() {

    if (!this.state.candidate) {
      return <div>Loading...</div>
    }

    return (
      <section className={css.relationship}>

        <Description content={content.description} />
        <Filter {...this.props} candidates={this.state.candidate} />
        <Social />

      </section>
    )
  }
}

export default Relationship;
