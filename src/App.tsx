import { Component } from 'react';
import { PadBank, Control } from './components';
import { heaterKit, pianoKit } from './common';

interface AppStates {
  power: boolean;
  display: null | string;
  currentpadBank: typeof heaterKit;
  currentPadBankId: 'Heater Kit' | 'Smooth Piano Kit';
  sliderValue: number;
}

class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      power: true,
      display: null,
      currentpadBank: heaterKit,
      currentPadBankId: 'Heater Kit',
      sliderValue: 0.3
    };
    this.togglePower = this.togglePower.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.displayClipName = this.displayClipName.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  togglePower() {
    this.setState((state) => ({
      power: !state.power
    }));
  }

  selectBank() {
    this.state.power && this.state.currentPadBankId === 'Heater Kit'
      ? this.setState({
          display: 'Smooth Piano Kit',
          currentpadBank: pianoKit,
          currentPadBankId: 'Smooth Piano Kit'
        })
      : this.setState({
          display: 'Heater Kit',
          currentpadBank: heaterKit,
          currentPadBankId: 'Heater Kit'
        });
  }

  displayClipName(name: string) {
    this.state.power && this.setState({ display: name });
  }

  clearDisplay() {
    this.setState({ display: null });
  }

  render() {
    return (
      <div className='App'>
        <div id='drum-machine' className='drum-machine'>
          <PadBank
            power={this.state.power}
            currentPadBank={this.state.currentpadBank}
            updateDisplay={this.displayClipName}
          />
          <Control />
        </div>
      </div>
    );
  }
}

export default App;
