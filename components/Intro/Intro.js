import React from 'react';
import PropTypes from 'prop-types';

import content from '../../static/json/intro.json'
import css from './Intro.scss';

class Intro extends React.Component {
	render() {
		return (
			<section className={css.intro}>
		    <h1 className={css.title}>{content.title} <span>{content.highlight}</span></h1>
		    {content.description.map((text, index) => (
		    	<p key={index}>{text}</p>
		    ))}
		    <button onClick={this.scrollTo} />
		  </section>
		);
	}
};

Intro.propTypes = {
  children: PropTypes.node,
};

Intro.defaultProps = {
  children: null,
};

export default Intro;
