import React, { Component, Fragment } from 'react';
import { translate } from 'react-i18next';
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import { Icon } from 'react-icons-kit';
import { sortDown } from 'react-icons-kit/fa/sortDown';

import LocalStorage from 'utils/LocalStorage';

import LogoIGN from 'static/img/logo_spa.png';

import 'rc-dropdown/assets/index.css';
import './Header.css';

const ES_LANG = 'CASTELLANO';
const EN_LANG = 'ENGLISH';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      langSelected: LocalStorage.getString('language') || 'es',
    };
  }

  changeLanguage = (lang) => {
    this.setState({ langSelected: lang }, () => {
      LocalStorage.putString('language', lang);
      window.location.reload();
    });
  }

  onSelect = ({key}) => {
    this.changeLanguage(key);
  }

  render() {
    const { langSelected } = this.state;
    const { t } = this.props;

    const menu = (
      <Menu onSelect={this.onSelect}>
        <MenuItem key='es'>{ES_LANG}</MenuItem>
        <MenuItem key='en'>{EN_LANG}</MenuItem>
      </Menu>
    );

    return (<Fragment>
      <header className='h-desktop'>
        <div className='logo-ign'>
          <img src={LogoIGN} alt='Logo IGN'/>
        </div>
        <div className='visor-title noselect-text'>
          <span dangerouslySetInnerHTML={{ __html: t('header.title') }} />
          <span>{t('header.subtitle')}</span>
        </div>
        <div className='visor-language noselect-text'>
          <Dropdown trigger={['click']} overlay={menu} animation='slide-up'>
            <span className='lang-option'>{langSelected === 'es' ? ES_LANG : EN_LANG}<Icon size={'12px'} icon={sortDown} /></span>
          </Dropdown>
        </div>
      </header>
    </Fragment>);
  }
}

export default translate()(Header);
