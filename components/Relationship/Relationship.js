import React from 'react';
import PropTypes from 'prop-types';
import css from './Relationship.scss';
import Api from '../../lib/Api';
import content from '../../static/json/relationship.json';

import Description from '../Description.js';
import Social from '../Social/Social.js';

import Filter from '../Filter.js';
import Cloud from '../Cloud.js';

class Relationship extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidate: null,
    };
  }

  getData = async () => {
    const candidate = await Api.getCandidate();
    const word = await Api.getWord();
    this.setState({ candidate, word });
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    if (!this.state.candidate) {
      return <div className={css.loading}>Loading...</div>
    }

    return (
      <section className={css.relationship}>
        <div className={css.flex}>
          <Description content={content.description} />
          <div>
            <Filter 
              {...this.props}
              data={this.state.candidate}
              startCompare
              relationship
            />
            {/*<div className={css.compare}>
              <Cloud id={this.props.filter} type='candidate' />
              <div className={css.common}>mais<br/>comuns</div>
              <Cloud id={this.props.compare} type='candidate' />
            </div>*/}
          </div>
        </div>
        {/*<Social stroke="#B4B4B4"/>*/}
      </section>
    )
  }
}

export default Relationship;
