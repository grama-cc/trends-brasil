import React from 'react';
import PropTypes from 'prop-types';
import css from './Project.scss';

class Project extends React.Component {
  render() {
    return (
      <div className={css.project}>
      	<h2>O projeto</h2>
        <p><b>“Na busca do Candidato”</b> é um projeto do Google News Lab com designers e programadores brasileiros.</p>
      	<p>Analisamos os dados de pesquisas no Google relacionados à campanha eleitoral de 2018. Buscamos entender o que mais interessa ao eleitor brasileiro sobre os candidatos ao cargo de Presidente da República.</p>
        <p>Acompanharemos os resultados até outubro de 2018, mês das eleições.</p>
        <p>O Google Trends analisa uma amostra aleatória das buscas feitas pelo Google em um período específico de tempo e as classifica em uma escala de 0 a 100, sendo 100 o termo de maior interesse de pesquisa. A partir daí, os outros resultados ganham valores relativos.</p>
        <p>Nesta página usamos um resumo da metodologia aqui apple pie sweet macaroon cotton candy. Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa</p>
      </div>
    )
  }
}

export default Project;
