import React from 'react';
import css from './Relationship.scss';

import Description from '../Description/Description.js';
import Social from '../Social/Social.js';
import Filter from './Filter.js';
import Cloud from './Cloud.js';

import Api from '../../lib/Api';
import {i18n} from '../../common/locale/i18n';

class Relationship extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      compare: null,
      relationship: null
    };
  }

  onFilter = async (id) => {
    this.setState({ filter: id });
    if(id && this.state.compare !== null) {
      const relationship = await Api.getRelationship(id, this.state.compare);
      this.setState({relationship: relationship});
    } else {
      const relationship = await Api.getRelationship(id, id);
      this.setState({relationship: relationship});
    }
  }

  onCompare = async (id) => {
    this.setState({ compare: id });

    console.log(this.state.filter)
   
    if(this.state.filter !== null && id) {

      console.log('compare')

      const relationship = await Api.getRelationship(this.state.filter, id);
      this.setState({relationship: relationship});

    } else {

      const relationship = await Api.getRelationship(id, id);

      this.setState({relationship: relationship});
    }
  }

  renderChart () {
    const lang = this.props.lang;

    if (!this.props.candidates) {
      return <div className={css.loading}>Loading...</div>
    }

    return (
      <React.Fragment>
        <div className={css.container}>
          <Filter 
            onFilter={this.onFilter} 
            onCompare={this.onCompare}

            filter={this.state.filter}
            compare={this.state.compare}

            candidates={this.props.candidates} 
            arrowColor={this.props.arrowColor}
            lang={this.props.lang}
          />
        </div>

        <div className={css.clouds}>
          {this.state.relationship ?
            <Cloud 
              words={this.state.relationship.candidato_1} 
              position='left'
            />
          : <div /> }

          <div className={css.common}>
            {i18n('relationship.common', lang)}
            {this.state.relationship && this.state.relationship.candidato_1.words != 0 ?
              this.state.relationship.intersection.map((word, index) => 
                <div 
                  key={index}
                  className={css.relationship_words}
                >
                  {word}
                </div>
              )
            : null}
          </div>

          {this.state.relationship ?
            <Cloud 
              words={this.state.relationship.candidato_2} 
              position='right'
            />
          : <div />}
        </div>
      </React.Fragment>
    )
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
              color='#f8f8f8'
            />
          </div>
          <div className={css.compare}>
            {this.renderChart()}
          </div>
        </div>
        <Social
          mediaHidden
          stroke='#b4b4b4'
          parent="Relationship_clouds_ybJRI"
          lang={this.props.lang}
        />
      </section>
    )
  }
}

export default Relationship;
