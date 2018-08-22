import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';

import Media from './Media.js';
import Twitter from './Twitter.js';
import Facebook from './Facebook.js';
import Whatsapp from './Whatsapp.js';
import { saveAs } from 'file-saver/FileSaver';

function writeDownloadLink(svgData){
    try {
        var isFileSaverSupported = !!new Blob();
    } catch (e) {
        alert("blob not supported");
    }
    var blob = new Blob([svgData], {type: "image/svg+xml"});
    saveAs(blob, "barChart.svg");
};

function handleClick(event, parentName) {
  var elements = document.getElementsByClassName(parentName)
  var svgContent= elements[0].outerHTML
  writeDownloadLink(svgContent)
}


const Social = props => (
  <React.Fragment>
    {props.children}
    <ul className={`${css.social} ${props.bottom ? css.bottom : null} ${props.share ? css.share : null}`}>
      {!props.share ?
      <li><a onClick={(e) => handleClick(e, props.parent)}><Media stroke={props.stroke} /></a></li> : null}
      <li><a href="#"><Twitter stroke={props.stroke} /></a></li>
      <li><a href="#"><Facebook stroke={props.stroke} /></a></li>
      <li><a href="#"><Whatsapp stroke={props.stroke} /></a></li>
    </ul>
  </React.Fragment>
);

Social.propTypes = {
  children: PropTypes.node
};

Social.defaultProps = {
  children: null
};


export default Social;
