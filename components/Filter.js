import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.scss';
import Arrow from './Arrow.js';

import {i18n} from '../common/locale/i18n';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openFilter: false
    };
  }

  onClickClear = () => {
    this.props.onFilter()
  }

  onFilter = (e) => {
    let id = Number(e.target.value)
    this.props.onFilter(id)
  }

  onDropdownFilter = (e) => {
    this.setState({
      openFilter: !this.state.openFilter
    })
  }

  renderDropdown(selectedNameFilter) {
    const candidates = this.props.candidates;
    const lang = this.props.lang;

    return (
      <ul onClick={this.onDropdownFilter} className={css.selected} >
        <p className={!this.props.filter ? css.show : null}>
          {i18n('filter.two', lang)}
        </p>

        <li className={css.choose}>
          <span>{this.props.filter ? selectedNameFilter : this.props.all ? i18n('filter.all', lang) : i18n('filter.choose', lang)}</span>
          <Arrow arrowColor={this.props.arrowColor} />
        </li>

        <div className={this.state.openFilter ? css.open : null}>
          <li
            onClick={this.onClickClear}
            className={!this.props.filter ? css.disabled : null}
          >
            {this.props.all ? i18n('filter.all', lang) :  i18n('filter.choose', lang)}
          </li>
          {candidates.map((c, idx) => (
            <li 
              key={idx}
              value={c.id}
              onClick={this.onFilter}
              className={this.props.filter == c.id ? css.disabled : null}
            >
              {c.name}
            </li>
          ))}
        </div>
      </ul>
    )
  }

  render() {
    const candidates = this.props.candidates;
    const filter = this.props.filter;
    const lang = this.props.lang;

    const f = candidates.filter(f => f.id === filter);
    const selectedNameFilter = filter ? f[0].name : i18n('filter.choose', lang);
    const filterSlug = filter ? f[0].slug + '.png' : 'none.svg';
    const filterColor = filter ? f[0].color : null;

    return (
      <React.Fragment>
        <div
          className={`${css.container} ${css.list}`}
          id={this.props.round === 2 ? css.list : null}
          //style={{
            //display: this.props.round === 2 ? 'flex' : 'none'
          //}}
        >
          <p
            onClick={this.onClickClear}
            className={`${!this.props.filter ? css.disabled : null} ${this.props.all ? css.show : null}`}
          >
            {i18n('filter.candidates', lang)}
          </p>
          <ul
            id={this.props.lineFilter ? css.lineList : null}
            className={this.props.all ? css.gray : this.props.round === 2 ? css.center : null}
          >
            {candidates.map((c, idx) => {
              return(
                <div
                  className={css.icons}
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                <li 
                  value={c.id}
                  data-name={c.name}
                  onClick={this.onFilter}
                  className={filter === c.id ? null : css.disabled}
                  style={{
                    backgroundImage: `url(/static/img/candidates/${c.slug}.png)`,
                    backgroundColor: filter === c.id ? c.color  : null,
                  }}
                />
                {this.props.lineFilter && filter === c.id ? <span
                  style={{
                    fontSize: '10px',
                    display: 'block',
                    textAlign: 'center',
                    textTransform: 'uppercase'
                  }}
                >{c.name}</span> : null }
                </div>
              )
            })}
          </ul>
        </div>

        <div className={`${css.container} ${css.filter}`}>
          <div>
            {this.props.round === 2 ? null : this.renderDropdown(selectedNameFilter)}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Filter;
