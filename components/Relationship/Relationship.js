import React from 'react';
import PropTypes from 'prop-types';
import css from './Relationship.scss';
import Api from '../../lib/Api';
import content from '../../static/json/relationship.json';

import Description from '../Description.js';
import Social from '../Social/Social.js';

import Filter from './Filter.js';
import Cloud from '../Cloud.js';

class Relationship extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidate: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const candidate = await Api.get('/candidate.json');
    this.setState({ candidate });
  }

  render() {

    if (!this.state.candidate) {
      return <div>Loading...</div>
    }

    const filter = this.state.candidate.filter(c => c.id == this.props.filter);
    const compare = this.state.candidate.filter(c => c.id == this.props.compare);

    return (
      <section className={css.relationship}>
        <div className={css.flex}>
            <div>
                <Description content={content.description} />
            </div>
            <div>
                <Filter {...this.props} candidates={this.state.candidate} />
                <div className={css.compare}>
                    <div>
                        <div
                            className={css.image}
                            style={{
                                backgroundImage: `url(/static/img/candidates/${filter.length ? filter[0].slug : 'none'}.png)`,
                                backgroundColor: filter.length ? filter[0].color : null,
                            }}
                        />
                        <Cloud category={this.props.filter} candidate />
                    </div>

                    <div className={css.common}>
                        mais<br/>comuns
                    </div>

                    <div>
                        <div
                            className={css.image}
                            style={{
                                backgroundImage: `url(/static/img/candidates/${compare.length ? compare[0].slug : 'none'}.png)`,
                                backgroundColor: compare.length ? compare[0].color : null,
                            }}
                        />
                        <Cloud category={this.props.compare} candidate />
                    </div>
                </div>
            </div>
        </div>

        <Social />

      </section>
    )
  }
}

export default Relationship;
