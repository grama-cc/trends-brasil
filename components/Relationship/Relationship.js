import React from 'react';
import css from './Relationship.scss';

import Description from '../Description.js';
import Social from '../Social/Social.js';
import Filter from '../Filter.js';
import Cloud from '../Cloud.js';

class Relationship extends React.Component {

  /*constructor (props) {
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
  }*/

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
            {this.props.candidates && this.props.words ? 
              <Cloud 
                id={this.props.filter} 
                candidates={this.props.candidates}
                words={this.props.words} 
                type='candidate' 
                position='left'
              />
            : 'Loading...'}
            {/*<Cloud id={this.props.filter} type='candidate' />*/}
            <div className={css.common}>mais<br/>comuns
               {this.props.relationship ?
                this.props.relationship.map((word,index) => 
                  <div 
                    className={css.relationship_words}
                    style={{top: (index+1)*8 + '%'}}>
                    {word}
                  </div>
                )
              : null}
            </div>
            {this.props.candidates && this.props.words ? 
              <Cloud 
                id={this.props.compare}
                candidates={this.props.candidates}
                words={this.props.words} 
                type='candidate'
                position='right'
              />
            : 'Loading...'}
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
              lang={this.props.lang}
            />
          </div>

          <div className={css.compare}>
            {this.renderChart()}
          </div>

        </div>

        <Social stroke='#b4b4b4' parent="Relationship_clouds_ybJRI"/>
        
      </section>
    )
  }
}

export default Relationship;
