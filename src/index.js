import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'languages/i18n';

import Main from 'pages/Main';

import { unregister } from './registerServiceWorker';

import 'static/fonts/fonts.css';

ReactDOM.render(<I18nextProvider i18n={i18n} >
  <Router basename='/visualizador'>
    <Switch>
      <Route path='*' exact={true} component={Main}/>
    </Switch>
  </Router>
</I18nextProvider>, document.getElementById('root'));

unregister();
