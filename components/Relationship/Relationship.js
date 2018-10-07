import React from 'react';
import css from './Relationship.scss';

import Description from '../Description/Description.js';
import Social from '../Social/Social.js';
import Filter from './Filter.js';
import Cloud from './Cloud.js';

import Api from '../../lib/Api';
import {i18n} from '../../common/locale/i18n';

class Relationship extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      compare: null,
      relationship: null
    };
  }

  onFilter = async (id) => {
    this.setState({ filter: id });

    if(id && this.state.compare !== null) {

      const relationship = await Api.getRelationship(id, this.state.compare);
      this.setState({relationship: relationship});

    } else {

      const relationship = await Api.getRelationship(id, id);
      this.setState({relationship: relationship});
    }

  }

  onCompare = async (id) => {
    this.setState({ compare: id });
   
    if(this.state.filter !== null && id) {

      const relationship = await Api.getRelationship(this.state.filter, id);
      this.setState({relationship: relationship});

    } else {

      const relationship = await Api.getRelationship(id, id);

      this.setState({relationship: relationship});
    }
  }

  getData = async (c1, c2) => {
    const relationship = await Api.getRelationship(c1, c2);
    this.setState({relationship: relationship});
  }

  componentDidMount() {
    if(this.props.round === 2) {
      this.getData(this.props.c1, this.props.c2);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.candidates !== this.props.candidates) {
      if(this.props.round === 2) {
        this.getData(this.props.c1, this.props.c2);
      } else {
        this.getData();
      }
    }
  }

  renderChart () {
    const lang = this.props.lang;

    if (!this.props.candidates) {
      return <div className={css.loading}>Loading...</div>
    }

    const c = this.props.candidates;

    return (
      <React.Fragment>
        <div className={css.container}>
          <Filter 
            onFilter={this.onFilter} 
            onCompare={this.onCompare}

            filter={this.props.round === 2 ? c[0].id : this.state.filter}
            compare={this.props.round === 2 ? c[1].id : this.state.compare}

            candidates={this.props.candidates} 
            arrowColor={this.props.arrowColor}
            lang={this.props.lang}
            round={this.props.round}
          />
        </div>

        <div className={css.clouds}>
          {this.state.relationship ?
            <Cloud 
              id={this.props.filter}
              words={this.state.relationship.candidato_1}
              candidates={this.props.candidates}
              position='left'
            />
          : <div /> }

          <div className={css.common}>
            {i18n('relationship.common', lang)}
            {this.state.relationship && this.state.relationship.candidato_1.words != 0 ?
              this.state.relationship.intersection.map((word, index) => 
                <div 
                  key={index}
                  className={css.relationship_words}
                >
                  {word}
                </div>
              )
            : null}
          </div>

          {this.state.relationship ?
            <Cloud
              id={this.props.filter}
              words={this.state.relationship.candidato_2}
              candidates={this.props.candidates}
              position='right'
            />
          : <div />}
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <section className={css.relationship}>
        <div className={css.content}>
          <div className={css.info}>
            <Description
              content='relationship'
              arrowColor={this.props.arrowColor}
              lang={this.props.lang}
              color='#f8f8f8'
            />
          </div>
          <div className={css.compare}>
            {this.renderChart()}
          </div>
        </div>
        <Social
          mediaHidden
          stroke='#b4b4b4'
          parent="Relationship_clouds_ybJRI"
          lang={this.props.lang}
        />
      </section>
    )
  }
}

export default Relationship;
