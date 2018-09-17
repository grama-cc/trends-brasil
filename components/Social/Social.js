import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';

import Media from './Media.js';
import Twitter from './Twitter.js';
import Facebook from './Facebook.js';
import Whatsapp from './Whatsapp.js';
import { saveAs } from 'file-saver/FileSaver';

class Social extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: 'download',
      modal: false,
      value: '',
      copied: false,
    }
  }

  writeDownloadLink = (svgData,parentName) => {
    try {
      var isFileSaverSupported = !!new Blob();
    } catch (e) {
      alert("blob not supported");
    }
    var blob = new Blob([svgData], {type: "data:image/svg+xml;base64",  disposition: "attachment"});
    saveAs(blob, parentName+".svg");
  }

  handleClick = (event, parentName)  => {
    var elements = document.getElementsByClassName(parentName)
    var svgContent = ''

    for(var i = 0; i < elements[0].childNodes.length; i++){

      console.log(elements[0].childNodes[i].nodeName)

      if(elements[0].childNodes[i].nodeName === 'svg'){
        svgContent = elements[0].childNodes[i].cloneNode(true)
        // svgContent.style.backgroundColor = "#ececec"
        svgContent.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink")
        svgContent.setAttribute("xmlns","http://www.w3.org/2000/svg")
        svgContent.setAttribute("xlink:href", "data:image/png;base64")
        svgContent = svgContent.outerHTML
      }
    }
    this.writeDownloadLink(svgContent, parentName)
  }

  openModal = () => {
    this.setState({modal: true})
  }

  closeModal = () => {
    this.setState({modal: false})
  }

  open = (e) => {
    const type = e.currentTarget.dataset.type
    this.setState({ open: type })
  }

  render () {

    return (
      <React.Fragment>

        <section
          onClick={this.closeModal}
          className={this.state.modal ? `${css.open} ${css.modal_container}` : css.modal_container}
        >
          
        </section>

        <div 
          //className={css.modal}
          className={this.state.modal ? `${css.open} ${css.modal}` : css.modal}
        >
          <nav>
            <h3 
              onClick={this.open}
              data-type='download'
            >
              Download
            </h3>
            {/*<h3
              onClick={this.open}
              data-type='embed'
            >
              Embed
            </h3>*/}
            {/*<h3
              onClick={this.open}
              data-type='link'
            >
              Link
            </h3>*/}
          </nav>

          <ul>
            <li
              type='download'
              className={this.state.open === 'download' ? css.open : css.close}
            >
              <a 
                onClick={(e) => this.handleClick(e, this.props.parent)}
                href={this.props.zip ? this.props.zip : 'javascript:void(0)'}
              >
                .svg
              </a>
            </li>

            <li className={this.state.open === 'embed' ? css.open : css.close}>
              <h4>Codigo</h4>
              <p>iframe</p>
              <button>Copiar</button>
            </li>

            <li className={this.state.open === 'link' ? css.open : css.close}>
              <h4>Link</h4>
              <p
              >
                {`https://www.nabuscadocandidato.com.br/#${this.props.id}`}
              </p>
              <button 
                onClick={this.copy}
                data-copy={`https://www.nabuscadocandidato.com.br/#${this.props.id}`}
              >
                Copiar
              </button>
            </li>
          </ul>
        </div>

        {this.props.children}

        <ul className={`${css.social} ${this.props.bottom ? css.bottom : null} ${this.props.share ? css.share : null}`}>
          {!this.props.share  && !this.props.mediaHidden ?
          <li>
            <a
              target="_blank"
              //href={this.props.zip ? this.props.zip : 'javascript:void(0)'}
              onClick={this.openModal}
            >
              <Media stroke={this.props.stroke} />
            </a>
          </li> : null}
          <li>
            <a 
              target="_blank"
              href={`https://twitter.com/home?status=Na busca do candidato: O que os brasileiros procuram no Google sobre as eleições de 2018? https%3A//www.nabuscadocandidato.com.br/`}
            >
              <Twitter stroke={this.props.stroke} />
            </a>
          </li>
          <li>
            <a 
              target="_blank" 
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A//www.nabuscadocandidato.com.br/"
            >
              <Facebook stroke={this.props.stroke} />
            </a>
          </li>
          <li className={css.whats}>
            <a
              target="_blank"
              href="whatsapp://send?text=Na busca do candidato O que os brasileiros procuram no Google sobre as eleições de 2018? https://www.nabuscadocandidato.com.br/" 
              data-action="share/whatsapp/share" 
              data-text="Na busca do candidato O que os brasileiros procuram no Google sobre as eleições de 2018?" 
              data-href="https://www.nabuscadocandidato.com.br/">
              <Whatsapp stroke={this.props.stroke} />
            </a>
          </li>
          <li className={css.webwhats}>
            <a
              target="_blank"
              href="https://web.whatsapp.com/send?text=Na busca do candidato O que os brasileiros procuram no Google sobre as eleições de 2018? https://www.nabuscadocandidato.com.br/" 
              data-action="share/whatsapp/share" 
              data-text="Na busca do candidato O que os brasileiros procuram no Google sobre as eleições de 2018?" 
              data-href="https://www.nabuscadocandidato.com.br/">
              <Whatsapp stroke={this.props.stroke} />
            </a>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}


export default Social;
