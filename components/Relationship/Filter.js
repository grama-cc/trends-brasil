import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.scss';
import Arrow from '../Arrow.js';
import {i18n} from '../../common/locale/i18n';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openFilter: false,
      openCompare: false
    };
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

  onCompare = (e) => {
    let id = Number(e.target.value)
    this.props.onCompare(id)
  }

  onDropdownCompare = (e) => {
    this.setState({ 
      openCompare: !this.state.openCompare
    })
  }

  renderImageFilter(slug, color) {
    return (
      <div
        className={css.image}
        id={this.props.round === 2 ? css.imagef : null}
        style={{
          backgroundImage: `url(/static/img/candidates/${slug})`,
          backgroundColor: color,
        }}
      />
    )
  }

  renderImageCompare(slug, color) {
    return (
      <div
        className={css.image}
        id={this.props.round === 2 ? css.imagec : null}
        style={{
          backgroundImage: `url(/static/img/candidates/${slug})`,
          backgroundColor: color,
        }}
      />
    )
  }

  renderDropdown(dropdown, dropdownFilter, dropdownSelected, dropdownState, dropdownCompare, dropdownFunc) {
    const candidates = this.props.candidates;
    const lang = this.props.lang;

    return (
      <ul 
        onClick={this.props.round === 2 ? null : dropdown}
        className={css.selected}
        id={this.props.round === 2 ? css.two : null}
      >
        <p className={!this.props.filter ? css.show : null}>
          {i18n('filter.two', lang)}
        </p>

        <li className={css.choose}>
          <span>{dropdownFilter ? dropdownSelected : this.props.all ? i18n('filter.all', lang) : i18n('filter.choose', lang)}</span>
          {this.props.round === 2 ? null : <Arrow arrowColor={this.props.arrowColor} />}
        </li>

        <div className={dropdownState ? css.open : null}>
          {candidates.map((c, idx) => (
            <li 
              key={idx}
              value={c.id}
              onClick={dropdownCompare != c.id ? dropdownFunc : null}
              className={dropdownCompare == c.id ? css.unclick : dropdownFilter == c.id && dropdownCompare != c.id ? css.disabled : null}
            >
              {c.name}
            </li>
          ))}
        </div>
        <p className={css.legend}>{i18n('filter.related', lang)}</p>
      </ul>
    )
  }

  render() {
    const candidates = this.props.candidates;
    const filter = this.props.filter;
    const compare = this.props.compare;
    const lang = this.props.lang;

    const f = candidates.filter(f => f.id === filter);
    const c = candidates.filter(c => c.id === compare);

    const selectedNameFilter = filter ? f[0].name : i18n('filter.choose', lang);
    const selectedNameCompare = compare ? c[0].name : i18n('filter.choose', lang);

    const filterSlug = filter ? f[0].slug + '.png' : 'none.svg';
    const filterColor = filter ? f[0].color : null;

    const compareSlug = compare ? c[0].slug + '.png' : 'none.svg';
    const compareColor = compare ? c[0].color : null;

    return (
      <React.Fragment>
        <div className={`${css.container} ${css.list} ${css.hide}`}>
          <p
            onClick={this.onClickClear}
            className={`${!this.props.filter ? css.disabled : null}`}
          >
            {i18n('filter.candidates', lang)}
          </p>
          <ul
            className={this.props.all ? css.gray : null}
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
                    backgroundColor: filter === c.id ? c.color : null,
                  }}
                />
                </div>
              )
            })}
          </ul>
        </div>

        <div className={`${css.container} ${css.filter} ${css.show}`}>
          <div>
            {this.renderImageFilter(filterSlug, filterColor)}
            {this.renderDropdown(this.onDropdownFilter, filter, selectedNameFilter, this.state.openFilter, compare, this.onFilter)}
          </div>
        </div>

        
          <div className={`${css.container} ${css.compare} ${css.show}`}>
            <div>
              {this.renderImageCompare(compareSlug, compareColor)}
              {this.renderDropdown(this.onDropdownCompare, compare, selectedNameCompare, this.state.openCompare, filter, this.onCompare)}
            </div>
          </div>
        
      </React.Fragment>
    )
  }
}

export default Filter;
