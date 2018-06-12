import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Api from '../lib/Api';

class Single extends React.Component {
  static async getInitialProps({ res, query }) {
    const data = await Api.get(`/single-${query.id}.json`);

    if (!data && res) {
      res.statusCode = 404;
    }

    return { ...data, query };
  }

  render() {
    if (!this.props.id) {
      return <Error statusCode={404} />;
    }

    return (
      <Layout>
        <Head
          title={this.props.title}
          description={this.props.description}
          image={this.props.image}
        />
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <p><img src={this.props.image} alt="" /></p>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </Layout>
    );
  }
}

Single.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Single;
