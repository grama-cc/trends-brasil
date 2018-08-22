import React from 'react';
import PropTypes from 'prop-types';
// import Api from '../../lib/Api';

import css from './Slider.scss';
import Select from './Select.js';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    const size = this.props.data.length - 1;

    if(this.state.idx < size) {
      this.setState({ idx: this.state.idx + 1 })
    }
  }

  onChangeView = (val) => {
    this.setState({ view: val })
  }

  render() {

    const idx = this.state.idx;
    const view = this.state.view;

    return (
      <React.Fragment>

        <ul className={css.nav}>
          {this.props.data.map((d, i) => {
            return(
              <li 
                className={idx === i ? `${css.clicked} ${css.item}` : `${css.item}` }
                key={i}
                data-idx={i}
                onClick={this.onClick}
                style={{
                  backgroundImage: `url(/static/img/categories/${d.id}.svg)`
                }}
              >
                {d.name} - {i}
              </li>
            )
          })}
        </ul>

        <div className={css.slider}>

          <div>Area de texto</div>
          {/*<h2>{data[idx].name} - {idx}</h2>
          <div className={css.text}>
            <p>Perguntas sobre idade, casamento, cargos ocupados e outras buscas biográficas sobre os candidatos</p>
          </div>*/}

          <Select
            click={this.onChangeView}
            val={view}
            // content={content.select}
          />

          <div className={css.nav}>
            <button onClick={this.onClickPrev}> Prev </button>
            <button onClick={this.onClickNext}> Next </button>
          </div>


          {console.log('index', this.state.idx)}

          <div val={view} className={css.bars}>View 1</div>

          <div val={view} className={css.terms}>View 2</div>

          <nav className={css.dots}>
            {this.props.data.map((d, i) => {
              return(
                <button 
                  className={idx === i ? `${css.clicked} ${css.item}` : `${css.item}` }
                  key={i}
                  data-idx={i}
                  onClick={this.onClick}
                />
              )
            })}
          </nav>

        </div>


      </React.Fragment>
    )
  }
}

export default Slider;
