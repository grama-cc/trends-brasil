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
    this.setState({
      openFilter: !this.state.openFilter
    })
  }

  onDropdownCompare = () => {
    this.setState({ 
      openCompare: !this.state.openCompare
    })
  }

  render() {
    const candidates = this.props.candidates;
    const filter = this.props.filter;
    const compare = this.props.compare;

    const f = candidates.filter(c => c.id == filter);
    const c = candidates.filter(c => c.id == compare);

    return (
      <div className={css.filter}>
        <div className={css.container}>
          {this.props.relationship ? 
          <div
            className={css.image}
            style={{
              backgroundImage: `url(/static/img/candidates/${f.length ? f[0].slug : 'none'}.png)`,
              backgroundColor: f.length ? f[0].color : null,
            }}
          /> : null}
          <ul
            onClick={this.onDropdownFilter}
            className={this.state.openFilter ? `${css.open} ${css.selected}` : css.selected}
          >
            <li >{this.state.name1}</li>
            {candidates.map((c, idx) => (
              <li 
                key={idx}
                value={c.id}
                data-name={c.name}
                onClick={compare != c.id ? this.onFilter : null}
                className={compare == c.id ? css.unclick : filter == c.id && compare != c.id ? css.disabled : null}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>

        {this.props.startCompare ? 
          <div className={css.container}>
          {this.props.relationship ? 
            <div
              className={css.image}
              style={{
                backgroundImage: `url(/static/img/candidates/${c.length ? c[0].slug : 'none'}.png)`,
                backgroundColor: c.length ? c[0].color : null,
              }}
            /> : null}
            <ul
              onClick={this.onDropdownCompare}
              className={this.state.openCompare ? `${css.open} ${css.selected}` : css.selected}
            >
             <li>{this.state.name2}</li>

              {candidates.map((c, idx) => (
                <li 
                  key={idx}
                  value={c.id}
                  data-name={c.name}
                  onClick={filter != c.id ? this.onCompare : null}
                  className={filter == c.id ? css.unclick : compare == c.id && filter != c.id ? css.disabled :  null}
                >
                  {c.name}
                </li>
              ))}
            </ul> 
          </div>
        : null}

      </div>
    )
  }
}

export default Filter;
