import React from 'react';
import PropTypes from 'prop-types';
import css from './Intro.scss';

const Intro = props => (
  <section className={css.intro}>
    <h1 className={css.title}>Na busca do candidato</h1>
    <p>O que os brasileiros procuram nas eleições de 2018? </p>
    <p>Veja o que pesquisam sobre os seis candidatos que lideram.</p>
    <button>go to</button>
  </section>
);

Intro.propTypes = {
  children: PropTypes.node,
};

Intro.defaultProps = {
  children: null,
};

export default Intro;
