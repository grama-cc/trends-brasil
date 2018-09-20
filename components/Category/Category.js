import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../lib/Api';

import css from './Category.scss';

import Description from '../Description/Description.js';
import Social from '../Social/Social.js';
import Select from './Select.js';
import Cloud from './Cloud.js';

import Chart from './Chart'
import ChartVertical from './ChartVertical';
import {i18n} from '../../common/locale/i18n';

class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bars: null,
      wordsCategory: null,
      idx: 0,
      view: 'bars',
    };
  }

  getData = async () => {
    const bars = await Api.getBar();
    const wordsCategory = await Api.getWordsCategory();
    this.setState({bars,  wordsCategory});
  }

  componentDidMount() {
    this.getData();
  }

  onClick = (e) => {
    const idx = Number(e.currentTarget.dataset.idx)
    this.setState({ idx: idx })
  }

  onClickPrev = () => {
    const size = 4;
    const idx = this.state.idx;
    if(idx > 0) {
      this.setState({ idx: idx - 1 })
    } else if (idx === 0) {
      this.setState({ idx: size })
    }
  }

  onClickNext = () => {
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

  renderNav (type) {
    const idx = this.state.idx;
    const lang = this.props.lang

    return(
      <nav className={type === 'btn' ? `${css.btn} ${css.nav}` : `${css.nav}`}>
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

  renderCharts() {
    const idx = this.state.idx;
    const view = this.state.view;
    const lang = this.props.lang;

    if(this.props.words && this.props.candidates && this.state.bars && this.state.wordsCategory) {
      return (
        <React.Fragment>
          <div className={css.desk}>
            <Chart 
              lang={this.props.lang}
              type={view} 
              data={this.state.bars[idx]}
            />
          </div>
          <div className={css.mobile}>
            <ChartVertical
              lang={this.props.lang}
              type={view}
              data={this.state.bars[idx]}
            />
          </div>
          <div type={view} className={css.cloud_container}>
            <Cloud 
              id={this.state.bars[idx].id} 
              words={this.state.wordsCategory} 
              color='#b4b4b4'
            />
          </div>
        </React.Fragment>
      )
    }
    return <div className={css.loading}>Loading...</div>
  }

  render() {
    const idx = this.state.idx;
    const view = this.state.view;
    const lang = this.props.lang;

    return (
      <section className={css.category}>
        <div className={css.content}>
          <div className={css.info}>
            <Description
              content='category'
              arrowColor={this.props.arrowColor}
              lang={lang}
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
              lang={lang}
            />

            {this.renderCharts()}

            {/*this.props.bars ? 
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
            */}

            {/*<div type={view} className={css.cloud_container}>
              {this.props.words && this.props.candidates && this.props.bars ? 
                <Cloud 
                  id={this.props.bars[idx].id} 
                  candidates={this.props.candidates}
                  words={this.props.words} 
                  keywords
                  color='#b4b4b4'
                />
              : null}
            </div>*/}
           
            {this.renderNav('btn')}
          </div>
        </div>
        <Social
          stroke='#b4b4b4'
          parent="Chart_container_1d8aV"
          lang={this.props.lang}
        />
      </section>
    )
  }
}

export default Category;
