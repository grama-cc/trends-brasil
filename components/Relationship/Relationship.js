import React from 'react';
import css from './Relationship.scss';

import Description from '../Description/Description.js';
import Social from '../Social/Social.js';
import Filter from '../Filter.js';

import Cloud from './Cloud.js';

import Api from '../../lib/Api';

import {i18n} from '../../common/locale/i18n';

class Relationship extends React.Component {

  renderChart () {
    if (!this.props.candidates && !this.props.words) {

      return <div className={css.loading}>Loading...</div>

    } else {

      const lang = this.props.lang; 

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
              lang={this.props.lang}
            />
          </div>

          <div className={css.clouds}>

            {this.props.relationship ?
              <Cloud 
                words={this.props.relationship.candidato_1} 
                position='left'
              />
            : <div/> }


            <div className={css.common}>

              {i18n('relationship.common', lang)}

              {this.props.relationship && this.props.relationship.candidato_1.words != 0 ?
                this.props.relationship.intersection.map((word, index) => 
                  <div 
                    key={index}
                    className={css.relationship_words}
                  >
                    {word}
                  </div>
                )
              : null}
            </div>

            {this.props.relationship ?
                <Cloud 
                  words={this.props.relationship.candidato_2} 
                  position='right'
                />
            : <div/>}

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
              color='#f8f8f8'
            />
          </div>

          <div className={css.compare}>
            {this.renderChart()}
          </div>

        </div>

        <Social
          // share
          mediaHidden
          stroke='#b4b4b4'
          parent="Relationship_clouds_ybJRI"
        />
        
      </section>
    )
  }
}

export default Relationship;
