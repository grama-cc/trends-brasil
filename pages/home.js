import React from 'react';
import { connect } from 'react-redux';

import Head from '../components/Head';
import Layout from '../components/Layout';

import Intro from '../components/Intro';
import Keywords from '../components/Keywords';

import Api from '../lib/Api';
import css from './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    //https://brasil-trends.herokuapp.com/v1/candidate/
    const data = await Api.get('/keywords.json');
    this.setState({ data });
  }

  render() {
    return (
      <Layout>
        <Head title="Home" />
        <Intro />
        <Keywords data={this.state.data} /> 
      </Layout>
    );
  }
}

const mapStateToProps = ({ user, auth }) => ({ user, auth });

export default connect(mapStateToProps)(Home);
