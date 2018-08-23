import React from 'react';
import css from './SectionWithFilter.scss';
import Filter from '../Filter.js';
import Period from '../Period/Period.js';
import Description from '../Description.js';
import Social from '../Social/Social.js';

class Section extends React.Component {

  renderFilter () {
    if (!this.props.candidates) {
      return
    } else {
      return (
        <Filter 
          onFilter={this.props.onFilter} 
          filter={this.props.filter}
          candidates={this.props.candidates}
          arrowColor='#b4b4b4'
        />
      )
    }
    
  }

  render() {
    const content = this.props.content;
    const candidates = this.props.candidates || [];
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

            <Description
              content={content}
              arrowColor={this.props.arrowColor}
              lang={this.props.lang}
              color={currentCandidate ? currentCandidate.color : '#b4b4b4'}
            />

            <ul 
              className={css.slider}
              style={{
                justifyContent: currentCandidate ? 'flex-end' : 'flex-start'
              }}
            > 
              <li>
                <img src={`/static/img/busto/${bg}`} alt={name} />
                <h3 className={!this.props.filter ? css.empty : null}>{name}</h3>
              </li>
            </ul>

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
            />
            <Social stroke='#fff' parent={this.props.children.props.className}/>

          </div>
        </div>
        
        
      </section>
    )
  }
}

export default Section;
