import { Component } from 'react';
import { DrumPad } from './components';

class DrumMachine extends Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <div id='drum-machine' className='drum-machine'>
          <DrumPad />
          <div className='control-container'></div>
        </div>
      </div>
    );
  }
}

export default DrumMachine;
