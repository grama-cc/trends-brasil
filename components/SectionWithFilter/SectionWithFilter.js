import React from 'react';
import css from './SectionWithFilter.scss';
import Filter from '../Filter.js';
import Period from '../Period/Period.js';
import Description from '../Description/Description.js';
import Social from '../Social/Social.js';

import {i18n} from '../../common/locale/i18n';

class Section extends React.Component {

  renderFilter () {
    if (!this.props.candidates || !this.props.load) {
      return
    } else {

      return (
        <Filter 
          onFilter={this.props.onFilter} 
          filter={this.props.filter}
          candidates={this.props.candidates}
          arrowColor='#b4b4b4'
          lang={this.props.lang}
          round={this.props.round}
        />
      )
    }
  }

  onPrev = (e) => {
    const idx = Number( e.currentTarget.dataset.index );
    const candidates = this.props.candidates;

    if( idx > 0 ) {
      this.props.onFilter( candidates[idx - 1].id )
    } else if( idx === 0 ) {
      this.props.onFilter( candidates[candidates.length - 1].id )
    }
  }

  onNext = (e) => {
    const idx = Number( e.currentTarget.dataset.index )
    const candidates = this.props.candidates;
    if( !idx ) {
      this.props.onFilter( candidates[0].id) 
    }
    if( idx < candidates.length - 1 ) {
      this.props.onFilter( candidates[idx + 1].id )
    } else if( idx === candidates.length - 1 ) {
      this.props.onFilter( candidates[0].id )
    }
  }

  findIndex = (array, attr, value) => {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return 0;
  }

  render() {
    const content = this.props.content;

    let candidates = this.props.candidates || [];

    // if(this.props.round === 2) {
      // candidates = candidates.filter((c) => c.second_round);
    // }

    const currentCandidate = candidates.find((c) => this.props.filter === c.id);
    const lang = this.props.lang;
    
    const bg = currentCandidate ? `${currentCandidate.slug}.png` : 'none.svg';
    const name = currentCandidate ? currentCandidate.name : i18n('slider.choose', lang);

    const idx = !this.props.filter ? null : this.findIndex( candidates, 'id', this.props.filter );

    return (
      <section
        className={css.section}
        style={{
          backgroundColor: currentCandidate ? currentCandidate.color : '#b4b4b4'
        }}
      >
        <div className={css.container}>

          <div className={css.info}>

            <Description
              content={content}
              arrowColor={this.props.arrowColor}
              lang={this.props.lang}
              color={currentCandidate ? currentCandidate.color : '#b4b4b4'}
            />

            <div className={css.slider_container}>
              <button 
                onClick={this.onPrev}
                data-index={idx}
                className={`${css.arrow} ${css.prev}`}
              />

              <ul 
                className={css.slider}
                style={{
                  justifyContent: currentCandidate ? 'flex-end' : 'flex-start'
                }}
              > 
                <li 
                  className={css.empty_container}
                  style={{
                    opacity: !this.props.filter ? 1 : 0
                  }}
                >
                  <img src='/static/img/busto/none.svg' alt={i18n('slider.choose', lang)} />
                  <h3 className={css.empty}>{i18n('slider.choose', lang)}</h3>
                </li>

                {candidates.map((c, i) => {
                  return (
                    <li
                      key={i}
                      style={{
                        opacity: this.props.filter === c.id ? 1 : 0
                      }}
                    >
                      <img src={`/static/img/busto/${c.slug}.png`} alt={c.name} />
                      <h3>{c.name}</h3>
                    </li>
                  )
                })}
              </ul>

              <button
                onClick={this.onNext}
                data-index={idx}
                className={`${css.arrow} ${css.next}`}
              />
            </div>
          </div>

          <div className={css.chart}>
            {this.renderFilter()}
            {this.props.children}
            <Period
              bgColor={currentCandidate ? currentCandidate.color : '#b4b4b4'}
              color='#fff'
              arrowColor={this.props.arrowColor}
              period={this.props.period}
              onClickPeriod={this.props.onClickPeriod}
              lang={this.props.lang}
            />
            <Social
              stroke='#fff'
              parent={this.props.parent}
              lang={this.props.lang}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default Section;
