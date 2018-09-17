import React from 'react';
// import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Filter.scss';
import Arrow from './Arrow.js';

import {i18n} from '../common/locale/i18n';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openFilter: false,
      openCompare: false
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
    //console.log('filter', slug)
    // console.log('filter', slug, this.props.compare, this.props.filter)
    return (
      <div
        className={css.image}
        style={{
          backgroundImage: `url(/static/img/candidates/${slug})`,
          backgroundColor: color,
        }}
      />
    )
  }

  renderImageCompare(slug, color) {
    // console.log('compare', slug, this.props.compare, this.props.filter)
    return (
      <div
        className={css.image}
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
      <ul onClick={dropdown} className={css.selected} >
        <p className={!this.props.filter ? css.show : null}>
          {i18n('filter.two', lang)}
        </p>

        <li className={css.choose}>
          <span>{dropdownFilter ? dropdownSelected : this.props.all ? i18n('filter.all', lang) : i18n('filter.choose', lang)}</span>
          <Arrow arrowColor={this.props.arrowColor} />
        </li>

        <div className={dropdownState ? css.open : null}>
          <li
            onClick={this.onClickClear}
            className={!this.props.filter ? css.disabled : null}
          >
            {this.props.all ?  i18n('filter.all', lang) :  i18n('filter.choose', lang)}
          </li>
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

        {this.props.relationship ? <p className={css.legend}>{i18n('filter.related', lang)}</p> : null}
      </ul>
    )
  }

  render() {
    const candidates = this.props.candidates;
    const filter = this.props.filter;
    const compare = this.props.compare;
    const relationship = this.props.relationship;
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
        <div className={`${css.container} ${css.list} ${relationship ? css.hide : null}`}>
          <p
            onClick={this.onClickClear}
            className={`${!this.props.filter ? css.disabled : null} ${this.props.all ? css.show : null}`}
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
                {this.props.lineFilter && filter === c.id ? <span
                  style={{
                    fontSize: '10px',
                    display: 'block',
                    textAlign: 'center'
                  }}
                >{c.name}</span> : null }
                </div>
              )
            })}
          </ul>
        </div>

        <div className={`${css.container} ${css.filter} ${relationship ? css.show : null}`}>
          <div>
            {relationship ? this.renderImageFilter(filterSlug, filterColor) : null}
            {this.renderDropdown(this.onDropdownFilter, filter, selectedNameFilter, this.state.openFilter, compare, this.onFilter)}
          </div>
        </div>

        {relationship ? 
          <div className={`${css.container} ${css.compare} ${relationship ? css.show : null}`}>
            <div>
              {relationship ? this.renderImageCompare(compareSlug, compareColor) : null}
              {this.renderDropdown(this.onDropdownCompare, compare, selectedNameCompare, this.state.openCompare, filter, this.onCompare)}
            </div>
          </div>
        : null}
      </React.Fragment>
    )
  }
}

export default Filter;
