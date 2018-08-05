import React from 'react';
import PropTypes from 'prop-types';
import css from './SectionWithFilter.scss';
// import * as d3 from "d3";

// import Api from '../../lib/Api';
import content from '../../static/json/keywords.json'
import Filter from '../Filter.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Section extends React.Component {

  render() {

    if (!this.props.candidates) {
      return <div className={css.loading}>Loading...</div>
    }

    const candidates = this.props.candidates;
    const currentCandidate = candidates.find((c) => this.props.filter === c.id)

    const bg = currentCandidate ? `${currentCandidate.slug}.png` : 'none.svg';
    const name = currentCandidate ? currentCandidate.name : 'Escolha um candidato';

    return (
      <section
        className={css.section}
        style={{
          backgroundColor: currentCandidate ? currentCandidate.color : '#b4b4b4'
        }}
      >
        <div className={css.container}>

          <div className={css.info}>
            <Description content={content.description} />

            <ul 
              className={css.slider}
              style={{
                justifyContent: currentCandidate ? 'flex-end' : 'flex-start'
              }}
            > 
              <li>
                <img src={`/static/img/busto/${bg}`} alt={`c.slug`} />
                <h3>{name}</h3>
              </li>
            </ul>

          </div>

          <div className={css.chart}>
            <Filter 
              onFilter={this.props.onFilter} 
              filter={this.props.filter}
              candidates={candidates} 
            />
            {this.props.children}
          </div>
        </div>
        
        <Social stroke='#fff' />
      </section>
    )
  }
}

export default Section;
