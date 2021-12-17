import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'react-icons-kit';
import { socialTwitter } from 'react-icons-kit/metrize/socialTwitter';

import './Footer.css';

class Footer extends Component {

  render() {
    return (
      <div className='footer'>
        <div className='footer-contact'>
          <p>Contacto</p>
          <p>Calle Lorem Ipsum, 76<br/>Madrid 28000 - España</p>
          <p><a href='mailto:johndoe@domain.com'>johndoe@domain.com</a></p>
        </div>
        <div className='footer-others'>
          <p><a href='#1'>Guía de navegación</a></p>
          <p><a href='#2'>Aviso legal</a></p>
          <p className='with-icon'><a href='#3'>Síguenos <Icon size={'22px'} icon={socialTwitter} /></a></p>
        </div>
      </div>
    );
  }
}

export default translate()(Footer);
