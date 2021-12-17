import React, { Component } from 'react';

import './MapAPICNIG.css';

class MapAPICNIG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splitViwer: false
    };
  }

  render() {
    return (<div className='visor-wrapper'>
      <div className='map' id='maplienzo'>
      </div>
    </div>);
  }
}

export default MapAPICNIG;
