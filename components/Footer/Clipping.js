import React from 'react';
import PropTypes from 'prop-types';
import css from './Clipping.scss';

class Clipping extends React.Component {
  render() {
    return (
      <ul className={css.clipping}>
      	<li>
      		<h3>Making Of</h3>
      		<p>Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa</p>
      	</li>
      	<li>
      		<h3>Link 2</h3>
      		<p>Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa</p>
      	</li>
      	<li>
      		<h3>Link 3</h3>
      		<p>Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa</p>
      	</li>
      </ul>
    )
  }
}

export default Clipping;
