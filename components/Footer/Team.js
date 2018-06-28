import React from 'react';
import PropTypes from 'prop-types';
import css from './Team.scss';

class Team extends React.Component {
  render() {
    return (
      <div className={css.team}>
      	<h2>Equipe</h2>
        <ul>
        	<li>
        		<h3>Carol Cavaleiro</h3>
          	<p>Direção de arte, edição e design</p>
          </li>

          <li>
          	<h3>Hub9</h3>
          	<p>Nome 1, Nome 2, Nome 3</p>
  				</li>

  				<li>
          	<h3>Grama</h3>
          	<p>Nome 1, Nome 2, Nome 3</p>
  				</li>

  				<li>
          	<h3>Google News Lab</h3>
          	<p>Marco Túlio Pires e Simon Rogers</p>
          </li>

  				<li>
          	<h3>Consultor de projetos</h3>
          	<p>Alberto Cairo</p>
          </li>
        </ul>

      </div>
    )
  }
}

export default Team;
