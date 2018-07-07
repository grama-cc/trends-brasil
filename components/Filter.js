import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import css from './Filter.scss';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled1: false,
      disabled2: false,
      name1: "Escolha...",
      name2: "Escolha...",
      openFilter: false,
      openCompare: false,
    };
  }

  onFilter = (e) => {
    let id = Number(e.target.value)
    this.props.onfilter(id)
    this.setState({ name1: e.currentTarget.dataset.name })
  }

  onCompare = (e) => {
    let id = Number(e.target.value)
    this.props.oncompare(id)
    this.setState({ name2: e.currentTarget.dataset.name })
  }

  onDropdownFilter = () => {
    this.setState({ openFilter: !this.state.openFilter })
  }

  onDropdownCompare = () => {
    this.setState({ openCompare: !this.state.openCompare })
  }

  render() {
    const candidates = this.props.candidates;
    const filter = this.props.filter;
    const compare = this.props.compare

    return (
      <div className={css.filter}>

        <ul className={this.state.openFilter ? `${css.open} ${css.selected}` : `${css.selected}`} id='filter'>
          
          <li onClick={this.onDropdownFilter}>{this.state.name1}</li>

          {candidates.map((c, idx) => (
            <li 
              key={idx}
              value={c.id}
              data-name={c.name}
              onClick={compare != c.id ? this.onFilter : null}
              className={compare == c.id ? css.taina : filter == c.id && compare != c.id ? css.disabled : null}
            >
              {c.name}
            </li>
          ))}
        </ul>

        {this.props.startCompare ? <ul className={this.state.openCompare ? `${css.open} ${css.selected}` : `${css.selected}`} id='compare'>

         <li onClick={this.onDropdownCompare}>{this.state.name2}</li>

          {candidates.map((c, idx) => (
            <li 
              key={idx}
              value={c.id}
              data-name={c.name}
              onClick={filter != c.id ? this.onCompare : null}
              className={filter == c.id ? css.taina : compare == c.id && filter != c.id ? css.disabled :  null}
            >
              {c.name}
            </li>
          ))}
        </ul> : null}

      </div>
    )
  }
}

export default Filter;
