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

  render() {

    if (!this.props.candidates) {
      return <div className={css.loading}>Loading...</div>
    }

    return (
      <section className={css.relationship}>
        <Description content={content.description} />

        <div className={css.compare}>
          <div className={css.container}>
            <Filter 
              onFilter={this.props.onFilter} 
              onCompare={this.props.onCompare}

              filter={this.props.filter}
              compare={this.props.compare}
              candidates={this.props.candidates} 
              startCompare
              relationship
            />
          </div>
          <div className={css.clouds}>
            <div />
            {/*<Cloud id={this.props.filter} type='candidate' />*/}
            <div className={css.common}>mais<br/>comuns</div>
            <div />
            {/*<Cloud id={this.props.compare} type='candidate' />*/}
          </div>
        </div>
        
      </section>
    )
  }
}

export default Relationship;
