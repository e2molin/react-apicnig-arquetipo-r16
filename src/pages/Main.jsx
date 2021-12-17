import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactNotification from 'react-notifications-component';

import Layout from 'components/Layout/Layout';

import 'react-notifications-component/dist/theme.css';

class Main extends Component {

  render() {
    /**
     * Con esto detectamos si a la url le sigue un listado de parámetros, que pasamos al layout como parámetros
     */
    const params = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[1] : undefined;
    console.log(params);
    return (
      <div className='app-container'>
        <ReactNotification />
        <Layout history={this.props.history} params={params} />
      </div>
    );
  }
}

export default translate()(Main);
