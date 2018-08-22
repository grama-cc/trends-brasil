import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../lib/Api';

import data from './data'
import css from './Category.scss';

import Description from '../Description.js';
import Social from '../Social/Social.js';
import Select from './Select.js';
import Chart from './Chart'
import Cloud from '../Cloud.js';

// import Slider from './Slider.js';


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
    if(this.state.idx > 0) {
      this.setState({ idx: this.state.idx - 1 })
    }
  }

  onClickNext = () => {
    const size = data.length - 1;

    if(this.state.idx < size) {
      this.setState({ idx: this.state.idx + 1 })
    }
  }

  onChangeView = (val) => {
    this.setState({ view: val })
  }

  getData = async () => {
    const bars = await Api.getBars();
    this.setState({ bars });
  }

  componentDidMount() {
    this.getData();
  }

  renderNav (type) {
    const idx = this.state.idx;

    return(
      <nav className={css.nav}>
        {data.map((d, i) => {
          return(
            <button 
              className={idx === i ? `${css.clicked} ${css.item}` : `${css.item}` }
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
                <h2>{data[idx].name}</h2>
                <p>Perguntas sobre idade, casamento, cargos ocupados e outras buscas biográficas sobre os candidatos</p>
              </div>

              <button
                className={`${css.arrow} ${css.next}`}
                onClick={this.onClickNext}
              /> 

            </header>
          
            <Select
              click={this.onChangeView}
              val={view}
              content={content.select}
            />

            <Chart type={view} data={data[idx]}/>
            <Cloud 
              type={view}
              id={data[idx].id} 
              candidates={this.props.candidates}
              words={this.props.words} 
              keywords
            />
            {this.renderNav('btn')}
          </div>
        </div>

        <Social stroke='#b4b4b4' />
      </section>
    )
  }
}

export default Category;
