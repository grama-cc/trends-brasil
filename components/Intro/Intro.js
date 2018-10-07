import React from 'react';
import PropTypes from 'prop-types';

import { i18n } from '../../common/locale/i18n';

import content from '../../static/json/intro.json'
import css from './Intro.scss';
import Arrow from '../Arrow.js';


class Intro extends React.Component {

	onScroll = (e) => {
		const scroll = document.getElementById('keywords').offsetTop;
    window.scrollTo({
    	top: scroll,
    	left: 0,
    	behavior: "smooth"
		});
  }

  getSearchParams = (key) => {
  	var params = {};
  	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(str,key,value){
      params[key] = value
    });
  	return key?params[key]:params;
	}

  componentDidMount() {
  	const getUrlPath = this.getSearchParams('lang');
  	if ( getUrlPath ) {
  		const lang = getUrlPath;
  		this.props.onChangeLang(lang);
  	}
  }

  onChangeLang = (e) => {
  	const getUrlPath = this.getSearchParams('lang');
  	const lang = e.currentTarget.lang;

  	if ( getUrlPath ) {
  		const lang = getUrlPath;
  	}
  	this.props.onChangeLang(lang);
    history.replaceState({}, '', `?lang=${lang}`);
  }


  onClickRound = (e) => {
  	const round = Number(e.currentTarget.dataset.round);

  	this.props.onClickRound(round);
  	this.props.onFilter();
  }

	render() {
		const lang = this.props.lang
		const round = this.props.round

		return (
			<section className={css.intro}>

				<ul className={css.translate}>
					<li>
						<button
							onClick={this.onChangeLang}
							lang='port'
							disabled={lang === 'port'}
						>
							PT
						</button>
					</li>
					<li>
						<button
							onClick={this.onChangeLang}
							lang='en'
							disabled={lang === 'en'}
						>
							EN
						</button>
					</li>
				</ul>

				<div className={css.boxAnimation}>
	       	<svg
	        	width="3500px"
	        	height="600px"
	        	viewBox="-2500 120 4000 600"
	        >
	          <path className={css.line1} opacity="0.2" fill="#73CAA6" d="M-2616.488,467.508 c281.774,52.479,512.985,78.951,693.63,79.411c217.7,0.556,464.311-51.208,780.296-51.208 c215.582,0,441.354-56.412,724.696-56.412c192.941,0,427.851,92.624,731.694,92.624c348.15,0,425.018-64.415,726.333-92.624 c301.316-28.21,513.239-17.021,695.839,0c0,21.961,0,34.272,0,36.937c-92.276-6.231-476.204-6.598-672.335,5.15 c-196.131,11.749-524.718,103.294-749.836,103.34c-225.121,0.042-630.155-52.758-754.073-52.803     c-123.92-0.044-563.338,30.931-732.207,30.931c-168.868,0-554.657,33.495-750.407,34.903 c-130.501,0.939-361.712-21.006-693.63-65.834V467.508z" />
	          <path className={css.line2} opacity="0.5" fill="#FF7E7E" d="M-1849.241,340.85 c214.355,6.258,439.538-213.933,750.667-213.933c212.27,0,425.646,138.99,704.635,138.99C-203.966,265.908,18.377,78,317.548,78     c342.802,0,399.705,279.949,711.069,279.949S1352.953,81.936,1736,78v227.436c-383.047,3.936-396.02,206.558-707.384,206.558 S660.35,232.047,317.548,232.047c-299.171,0-517.419,198.076-707.396,198.076c-278.989,0-464.754-164.215-742.725-164.215 c-311.127,0-474.095,197.595-688.447,191.336c-266.804-7.787-795.468-225.197-795.468-225.197v-92.634 C-2616.488,139.413-2116.041,333.061-1849.241,340.85z" />
	          <path className={css.line3} opacity="0.2" fill="#85C974" d="M1138.244,197.181 c-341.654,0-610.029,53.396-921.06,53.396c-212.201,0-425.508-34.692-704.409-34.692c-189.915,0-412.187,46.901-711.265,46.901     c-342.692,0-399.574-69.874-710.841-69.874c-311.266,0-324.233,68.893-707.158,69.874v-56.767 c382.924-0.983,395.892-51.557,707.158-51.557c311.267,0,368.149,69.874,710.841,69.874c299.078,0,459.583-49.439,707.173-49.439     c278.901,0,464.607,40.988,742.489,40.988c311.03,0,542.544-47.756,858.86-47.756c317.385,0,624.589,56.207,624.589,56.207v23.121 C1734.622,247.458,1416.158,197.181,1138.244,197.181z" />
	          <path className={css.line4} opacity="0.5" fill="#FFA865" d="M-1878.663,432.296 c218.021,6.274,260.8-127.96,640.265-104.425c379.463,23.535,543.51,194.633,814.214,194.633 c193.222,0,411.008-171.579,715.296-171.579c348.662,0,410.167-98.758,726.854-98.758S1346.404,437.985,1736,434.041v75.773 c-389.597,3.948-401.347-103.189-718.034-103.189s-378.192,98.76-726.854,98.76c-304.289,0-522.074,171.577-715.296,171.577 c-283.759,0-604.794-257.562-820.692-257.562c-316.448,0-415.766,173.63-633.787,167.354     c-271.362-7.81-546.468-137.39-737.825-137.39c0,0,0-40.495,0-121.493C-2302.216,327.871-2150.026,424.485-1878.663,432.296z" />
	          <path className={css.line5} opacity="0.5" fill="#BD6BE5" d="M1736,262.808v129.875 c-299.778,0-528.299,66.955-626.105,70.164c-146.713,4.811-456.268-54.917-640.649-54.917 c-184.379,0-548.437,88.892-649.674,88.892c-165.198,0-292.058-65.349-650.029-64.633 c-311.548,18.276-432.415,105.057-639.161,117.55c-206.748,12.495-434.851-11.222-726.219-52.917 c-251.422-35.978-361.039-100.972-420.65-137.278v-96.735c34.914,0.073,142.893,112.392,435.424,151.708 c260.723,35.045,503.643,42.744,711.445,17.673c207.804-25.07,332.647-128.377,639.161-128.377 c267.506,0,480.163,147.057,650.029,147.057c249.456,0,459.874-147.057,649.674-147.057 c278.196,0,359.416,146.769,640.649,128.377C1301.477,419.662,1549.784,260.666,1736,262.808z" />
	          <path className={css.line6} opacity="0.3" fill="#8591E7" d="M-2616.488,728.996V623.306 c299.776,0,452.636-68.919,626.103-84.744c173.466-15.829,511.213,62.189,640.649,66.975 c129.437,4.786,439.236-82.838,649.675-66.975c210.439,15.861,292.058,53.178,650.029,52.594 c311.548-14.871,371.221-25.316,577.428-52.594c206.202-27.279,496.583-33.931,787.955,0 c251.42,29.276,361.036,82.166,420.65,111.711v78.723c-34.914-0.061-142.896-91.462-435.427-123.459 c-260.724-28.519-517.448-2.632-725.252,17.77c-207.803,20.403-318.839,72.32-625.354,72.32 c-267.506,0-480.163-119.67-650.029-119.67c-249.456,0-404.937,119.67-649.675,119.67c-278.196,0-359.413-119.436-640.649-104.471 C-2181.965,601.352-2430.275,730.738-2616.488,728.996z" />
	        </svg>
				</div>

				<div className={css.info}>
			    <h1 className={css.title}>{i18n('intro.title', lang)}<span>{i18n('intro.highlight', lang)}</span></h1>
			    {i18n('intro.description', lang).map((text, index) => (
			    	<p key={index}>{text}</p>
			    ))}
			    <button onClick={this.onScroll}>
			    	<Arrow arrowColor={this.props.arrowColor}/>
			    </button>
		    </div>

		    <div 
		    	className={css.rounds}
		    	style={{
		    		// background: 'red',
				    // position: 'fixed',
				    // top: 0,
				    // zIndex: 999999,
				    // height: '50px'
		    	}}
		    >
		    	<button 
		    		data-round={1}
		    		onClick={this.onClickRound}
		    		disabled={round === 1}
		    	>
		    		1º Turno
		    	</button>
		    	<button
		    		data-round={2}
		    		onClick={this.onClickRound}
		    		disabled={round === 2}
		    	>
		    		2º Turno
		    	</button>
		    </div>

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
