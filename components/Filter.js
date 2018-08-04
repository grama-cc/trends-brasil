import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Filter.scss';

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

  onDropdownFilter = () => {
    this.setState({
      openFilter: !this.state.openFilter
    })
  }

  onCompare = (e) => {
    let id = Number(e.target.value)
    this.props.onCompare(id)
  }

  onDropdownCompare = () => {
    this.setState({ 
      openCompare: !this.state.openCompare
    })
  }

  renderImage(has, slug, color) {
    const filter = this.props.filter;
    if(filter) {
      return (
        <div
          className={css.image}
          style={{
            backgroundImage: `url(/static/img/candidates/${has ? slug : 'none'}.png)`,
            backgroundColor: has ? color : null,
          }}
        />
      )
    } else {
      return
    }
  }

  renderDropdown(dropdown, dropdownFilter, dropdownSelected, dropdownState, dropdownCompare, dropdownFunc) {
    const candidates = this.props.candidates;
    return (
      <ul onClick={dropdown} className={css.selected} >

        <li className={css.choose}>{dropdownFilter ? dropdownSelected : 'Escolha...'}</li>

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
      </ul>
    )
  }

  render() {
    const candidates = this.props.candidates;
    const filter = this.props.filter;
    const compare = this.props.compare;
    const relationship = this.props.relationship;

    const f = candidates.filter(c => c.id == filter);
    const c = candidates.filter(c => c.id == compare);

    const selectedNameFilter = filter ? f[0].name : 'Escolha...';
    const selectedNameCompare = compare ? c[0].name : 'Escolha...';

    return (
      <React.Fragment>
        <div className={`${css.container} ${css.list}`}>
          <ul>
            {candidates.map((c, idx) => {
              return(
                <li 
                  key={idx}
                  value={c.id}
                  data-name={c.name}
                  onClick={this.onFilter}
                  className={filter === c.id ? null : css.disabled}
                  style={{
                    backgroundImage: `url(/static/img/candidates/${c.slug}.png)`,
                  }}
                />
              )
            })}
          </ul>
        </div>

        <div className={`${css.container} ${css.filter}`}>
          {relationship && filter != 0 ? this.renderImage(f.length, f[0].slug, f[0].color) : null}

          {this.renderDropdown(this.onDropdownFilter, filter, selectedNameFilter, this.state.openFilter, compare, this.onFilter)}
        </div>

        {this.props.startCompare ? 
          <div className={`${css.container} ${css.compare}`}>
          {relationship && compare != 0 ? this.renderImage(c.length, c[0].slug, c[0].color) : null}
          
          {this.renderDropdown(this.onDropdownCompare, compare, selectedNameCompare, this.state.openCompare, filter, this.onCompare)}
          </div>
        : null}
      </React.Fragment>
    )
  }
}

export default Filter;
