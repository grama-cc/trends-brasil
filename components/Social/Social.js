import React from 'react';
import PropTypes from 'prop-types';
import css from './Social.scss';

import Media from './Media.js';
import Twitter from './Twitter.js';
import Facebook from './Facebook.js';
import Whatsapp from './Whatsapp.js';
import { saveAs } from 'file-saver/FileSaver';

import {i18n} from '../../common/locale/i18n';

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
    const lang = this.props.lang;
    const zip = this.props.zip;

    return (
      <React.Fragment>
        <section
          onClick={this.closeModal}
          className={this.state.modal ? `${css.open} ${css.modal_container}` : css.modal_container}
        />
        <div 
          className={this.state.modal ? `${css.open} ${css.modal}` : css.modal}
        >
          <nav>
            <h3 
              onClick={this.open}
              data-type='download'
            >
              Download
            </h3>
          </nav>

          <ul>
            <li
              type='download'
              className={this.state.open === 'download' ? css.open : css.close}
            >
              <p>{i18n('share.download', lang)}</p>
              <a 
                onClick={(e) => this.handleClick(e, this.props.parent)}
                href={zip ? zip : 'javascript:void(0)'}
              >
                .svg
              </a>
            </li>
          </ul>
        </div>

        {this.props.children}

        <ul className={`${css.social} ${this.props.bottom ? css.bottom : null} ${this.props.share ? css.share : null}`}>
          {!this.props.share && !this.props.mediaHidden ?
          <li className={css.media}>
            <a
              target="_blank"
              onClick={this.openModal}
            >
              <Media stroke={this.props.stroke} />
            </a>
          </li> : null}
          <li>
            <a 
              target="_blank"
              href={`https://twitter.com/home?status=${i18n('share.text', lang)} ${i18n('share.url', lang)}`}
            >
              <Twitter stroke={this.props.stroke} />
            </a>
          </li>
          <li>
            <a 
              target="_blank" 
              href={`https://www.facebook.com/sharer/sharer.php?u=${i18n('share.url', lang)}`}
            >
              <Facebook stroke={this.props.stroke} />
            </a>
          </li>
          <li className={css.whats}>
            <a
              target="_blank"
              href={`whatsapp://send?text=${i18n('share.text', lang)} ${i18n('share.url', lang)}`} 
              data-action="share/whatsapp/share" 
              data-text={i18n('share.text', lang)}
              data-href={i18n('share.url', lang)}
            >
              <Whatsapp stroke={this.props.stroke} />
            </a>
          </li>
          <li className={css.webwhats}>
            <a
              target="_blank"
              href={`https://web.whatsapp.com/send?text=${i18n('share.text', lang)} ${i18n('share.url', lang)}`} 
              data-action="share/whatsapp/share" 
              data-text={i18n('share.text', lang)} 
              data-href={i18n('share.url', lang)}
            >
              <Whatsapp stroke={this.props.stroke} />
            </a>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}


export default Social;
