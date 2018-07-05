import React from 'react';
import PropTypes from 'prop-types';

import content from '../../static/json/intro.json'
import css from './Intro.scss';

class Intro extends React.Component {

	onScroll = (e) => {
		const scroll = document.getElementById('keywords').offsetTop;
    window.scrollTo({
    	top: scroll,
    	left: 0,
    	behavior: "smooth"
		});
  }

	render() {
		return (
			<section className={css.intro}>
		    <h1 className={css.title}>{content.title} <span>{content.highlight}</span></h1>
		    {content.description.map((text, index) => (
		    	<p key={index}>{text}</p>
		    ))}
		    <button onClick={this.onScroll} />
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
