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
      name: {
        filter: "Escolha...",
        compare: "Escolha..."
      }
      /*sel: {
        na: false,
        ha: false
      }*/
    };
  }

  onFilter = (e) => {
    let id = Number(e.target.value)
    this.props.onfilter(id)

    //if (!this.props.open) {
    this.setState({ name1: e.currentTarget.dataset.name })
    //} else {
      //console.log('oi')
      //console.log(id)
    //}

    console.log(id, e.target.value)
    
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

  renderImage(has, slug, color) {
    const filter = this.props.filter;
    if(filter != 0) {
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

  render() {
    const data = this.props.data;
    const filter = this.props.filter;
    const compare = this.props.compare;
    const relationship = this.props.relationship;

    const f = data.filter(c => c.id == filter);
    const c = data.filter(c => c.id == compare);

    //const currentColor = filter === 0 ? '#b4b4b4' : data[data.length - 1].color;

   //console.log(currentColor)

    return (
      <React.Fragment>

        <div className={`${css.container} ${css.list}`}>
          <ul>
            {data.map((c, idx) => (
              <li 
                key={idx}
                value={c.id}
                data-name={c.name}
                onClick={this.onFilter}
                className={filter == c.id ? null : css.disabled}
                style={{
                  backgroundImage: `url(/static/img/candidates/${c.slug}.png)`,
                }}
              />
            ))}
          </ul>
        </div>

        <div className={`${css.container} ${css.filter}`}>
          {relationship && filter != 0 ? this.renderImage(f.length, f[0].slug, f[0].color) : null}
          <ul
            onClick={this.onDropdownFilter}
            className={css.selected}
          >
            <li className={css.choose}>{this.state.name1}</li>
            <div className={this.state.openFilter ? css.open : null}>
              {data.map((c, idx) => (
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
            </div>
          </ul>
        </div>

        {this.props.startCompare ? 
          <div className={`${css.container} ${css.compare}`}>

          {relationship && compare != 0 ? this.renderImage(c.length, c[0].slug, c[0].color) : null}

            <ul
              onClick={this.onDropdownCompare}
              className={css.selected}
            >
             <li>{this.state.name2}</li>
             <div className={this.state.openCompare ? css.open : null}>
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
              </div>
            </ul> 

          </div>
        : null}

      </React.Fragment>
    )
  }
}

export default Filter;
