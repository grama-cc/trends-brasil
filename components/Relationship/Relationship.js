import React from 'react';
import css from './Relationship.scss';

import Description from '../Description.js';
import Social from '../Social/Social.js';
import Filter from '../Filter.js';
import Cloud from '../Cloud.js';

class Relationship extends React.Component {

  /*
    constructor (props) {
      super(props)

      this.state = {
        relationship: null,
      };
    }

    getData = async () => {
      const relationship = await Api.getRelationship();
      this.setState({ relationship });
    }

    componentDidMount() {
      this.getData();
    }
  */

  renderChart () {
    if (!this.props.candidates && !this.props.words) {

      return <div className={css.loading}>Loading...</div>

    } else {

      return (
        <React.Fragment>
          <div className={css.container}>
            <Filter 
              onFilter={this.props.onFilter} 
              onCompare={this.props.onCompare}

              filter={this.props.filter}
              compare={this.props.compare}

              candidates={this.props.candidates} 
              arrowColor={this.props.arrowColor}
              relationship
            />
          </div>
          <div className={css.clouds}>
            <Cloud 
              id={this.props.filter} 
              candidates={this.props.candidates}
              words={this.props.words} 
              type='candidate' 
            />
            {/*<Cloud id={this.props.filter} type='candidate' />*/}
            <div className={css.common}>mais<br/>comuns</div>
            <Cloud 
              id={this.props.compare}
              candidates={this.props.candidates}
              words={this.props.words} 
              type='candidate'
            />
          </div>
        </React.Fragment>
      )
    }
  }

  render() {

    return (
      <section className={css.relationship}>

        <div className={css.content}>
          <div className={css.info}>
            <Description
              content='relationship'
              arrowColor={this.props.arrowColor}
            />
          </div>

          <div className={css.compare}>
            {this.renderChart()}
          </div>

        </div>

        <Social stroke='#b4b4b4' />
        
      </section>
    )
  }
}

export default Relationship;
