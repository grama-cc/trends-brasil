import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../lib/Api';

// import data from './data'
import css from './Category.scss';

import Description from '../Description/Description.js';
import Social from '../Social/Social.js';
import Select from './Select.js';
import Chart from './Chart'
import Cloud from '../Cloud.js';

import ChartVertical from './ChartVertical';

import {i18n} from '../../common/locale/i18n';

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bars: null,
      idx: 0,
      view: 'bars',
    };
  }

  onClick = (e) => {
    const idx = Number(e.currentTarget.dataset.idx)
    this.setState({ idx: idx })
  }

  onClickPrev = () => {
    //const size = this.props.bars.length - 1;
    const size = 4;
    const idx = this.state.idx;

    if(idx > 0) {
      this.setState({ idx: idx - 1 })
    } else if (idx === 0) {
      this.setState({ idx: size })
    }
  }

  onClickNext = () => {
    //const size = this.props.bars.length - 1;
    const size = 4;
    const idx = this.state.idx;

    if(idx < size) {
      this.setState({ idx: idx + 1 })
    } else if (idx === size) {
      this.setState({ idx: 0 })
    }

  }

  onChangeView = (val) => {
    this.setState({ view: val })
  }

  /*onChangeLang = (e) => {
    const lang = e.currentTarget.lang
    this.props.onChangeLang(lang)
  }*/

  renderNav (type) {
    const idx = this.state.idx;
    const lang = this.props.lang

    return(
      <nav className={type === 'btn' ? `${css.btn} ${css.nav}` : `${css.nav}`}>

      {/*this.props.bars ? this.props.bars.map((d, i) => {*/}
        {i18n('category.list', lang).map((d, i) => {
          return(
            <button 
              className={idx === i ? `${css.clicked} ${css.item}` : `${css.item}`  }
              key={i}
              data-idx={i}
              onClick={this.onClick}
              style={{
                backgroundImage: type === 'btn' ? null : `url(/static/img/categories/${d.id}.svg)`
              }}
            >
              {type === 'btn' ? null : d.name}
            </button>
          )
        })}
    </nav>
    )
  }

  render() {

    const idx = this.state.idx;
    const view = this.state.view;
    const lang = this.props.lang;

    /*const text = [
      "Políticos em mandato ativo e demais personalidades do mundo político, como ministros do Supremo e juízes federais.",
      
      "Buscas relacionadas a notícias e seus veículos de publicação, como jornais, sites ou programas de TV.",
      
      "Todos os termos relacionados à ideologia política dos candidatos, como partido, plano de governo e declarações.",
      
      "Cantores, atores, ex-BBBs… quem orbita os candidatos à Presidência na busca relacionada.",
      
      "Buscas sobre a vida pública dos candidatos, como cargos ocupados  ou pretendidos e envolvimento em casos de corrupção.",
      
      "Termos amplamente buscados que não se enquadram em nenhuma classificação.",
    ]*/
    
    if(!this.props.candidates && !this.props.words) {
      return <div className={css.loading}>Loading...</div>
    }

    return (
      <section className={css.category}>

        <div className={css.content}>

          <div className={css.info}>
            <Description
              content='category'
              arrowColor={this.props.arrowColor}
              lang={this.props.lang}
              color='#f8f8f8'
            />
            {this.renderNav()}
          </div>

          <div className={css.chart}>

            <header>
              <button
                className={`${css.arrow} ${css.prev}`}
                onClick={this.onClickPrev}
              /> 

              <div className={css.text}>
                <h2>{i18n(`category.list`, lang)[idx].name}</h2>
                <p>{i18n(`category.list`, lang)[idx].text}</p>
              </div>

              <button
                className={`${css.arrow} ${css.next}`}
                onClick={this.onClickNext}
              /> 

            </header>
            
            <Select
              click={this.onChangeView}
              val={view}
              content='keywords.select'
              lang={this.props.lang}
            />
            {this.props.bars ? 
              <React.Fragment>
                <div className={css.desk}>
                  <Chart 
                    lang={this.props.lang}
                    type={view} 
                    data={this.props.bars[idx]}
                  />
                </div>
                <div className={css.mobile}>
                  <ChartVertical
                    lang={this.props.lang}
                    type={view}
                    data={this.props.bars[idx]}
                  />
                </div>
              </React.Fragment>
              : 'Loading...'
            }
            <div type={view} className={css.cloud_container}>
            {this.props.words && this.props.candidates && this.props.bars ? 
              <Cloud 
                id={this.props.bars[idx].id} 
                candidates={this.props.candidates}
                words={this.props.words} 
                keywords
                color='#b4b4b4'
              />
            : 'Loading'}
            </div>
           
            {this.renderNav('btn')}
          </div>
        </div>

        <Social stroke='#b4b4b4' parent="Chart_container_1d8aV"/>
      </section>
    )
  }
}

export default Category;
