import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';

import Media from './Media.js';
import Twitter from './Twitter.js';
import Facebook from './Facebook.js';
import Whatsapp from './Whatsapp.js';
import { saveAs } from 'file-saver/FileSaver';

function writeDownloadLink(svgData,parentName){
    console.log(svgData)
    try {
        var isFileSaverSupported = !!new Blob();
    } catch (e) {
        alert("blob not supported");
    }
    var blob = new Blob([svgData], {type: "image/svg+xml"});
    saveAs(blob, parentName+".svg");
};

function handleClick(event, parentName) {
  var elements = document.getElementsByClassName(parentName)
  var svgContent = ''
  for(var i = 0; i < elements[0].childNodes.length; i++){
      console.log(elements[0].childNodes[i].nodeName)
      if(elements[0].childNodes[i].nodeName === 'svg'){
        svgContent = elements[0].childNodes[i].cloneNode(true)
        svgContent.style.backgroundColor = "#ececec"
        svgContent.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink")
        svgContent = svgContent.outerHTML
      }
  }
  writeDownloadLink(svgContent, parentName)
}

function twitterShare(event) {
  const url = 'http://www.nabuscadocandidato.com.br/'
  const twitterShareUrl = `https://twitter.com/home?status=${encodeURIComponent(url)}`
  window.open(twitterShareUrl, '_blank', 'noopener')
}


const Social = props => (
  <React.Fragment>
    {props.children}
    <ul className={`${css.social} ${props.bottom ? css.bottom : null} ${props.share ? css.share : null}`}>
      {!props.share ?
      <li><a onClick={(e) => handleClick(e, props.parent)}><Media stroke={props.stroke} /></a></li> : null}
      <li><a href={`https://twitter.com/home?status=Na busca do candidato: O que os brasileiros procuram no Google sobre as eleições de 2018? https%3A//www.nabuscadocandidato.com.br/`}><Twitter stroke={props.stroke} /></a></li>

      {/*<li><a onClick={(e) => twitterShare(e)}><Twitter stroke={props.stroke} /></a></li>*/}
      <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//trends-brasil.herokuapp.com/" target="_blank"><Facebook stroke={props.stroke} /></a></li>
      <li>
        <a 
          href="whatsapp://send?text=Na busca do candidato O que os brasileiros procuram no Google sobre as eleições de 2018? http://www.nabuscadocandidato.com.br/" 
          data-action="share/whatsapp/share" 
          data-text="Na busca do candidato O que os brasileiros procuram no Google sobre as eleições de 2018?" 
          data-href="http://www.nabuscadocandidato.com.br/">
          <Whatsapp stroke={props.stroke} />
        </a>
      </li>
    </ul>
  </React.Fragment>
);


export default Social;
