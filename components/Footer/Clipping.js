import React from 'react';
import PropTypes from 'prop-types';
import css from './Clipping.scss';

class Clipping extends React.Component {
  render() {
    return (
      <ul className={css.clipping}>
      	<li>
      		<h2>Making Of</h2>
      		<p>Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa</p>
      	</li>
      	<li>
      		<h2>Link 2</h2>
      		<p>Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa</p>
      	</li>
      	<li>
      		<h2>Link 3</h2>
      		<p>Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa</p>
      	</li>
      </ul>
    )
  }
}

export default Clipping;
