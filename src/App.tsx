import { Component } from 'react';
import { PadBank, Control } from './components';
import { heaterKit, pianoKit } from './common';

interface AppStates {
  power: boolean;
  display: null | string;
  currentpadKit: typeof heaterKit;
  currentPadKitId: 'Heater Kit' | 'Smooth Piano Kit';
  sliderValue: number;
}

class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      power: true,
      display: null,
      currentpadKit: heaterKit,
      currentPadKitId: 'Heater Kit',
      sliderValue: 0.3
    };
    this.togglePower = this.togglePower.bind(this);
    this.selectKit = this.selectKit.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  togglePower() {
    this.setState((state) => ({
      power: !state.power
    }));
  }

  selectKit() {
    this.state.power && this.state.currentPadKitId === 'Heater Kit'
      ? this.setState({
          display: 'Smooth Piano Kit',
          currentpadKit: pianoKit,
          currentPadKitId: 'Smooth Piano Kit'
        })
      : this.setState({
          display: 'Heater Kit',
          currentpadKit: heaterKit,
          currentPadKitId: 'Heater Kit'
        });
  }

  adjustVolume(volume: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ sliderValue: Number(volume.target.value) });
    setTimeout(this.clearDisplay, 1000);
  }

  updateDisplay(name: string) {
    this.state.power && this.setState({ display: name });
  }

  clearDisplay() {
    this.setState({ display: null });
  }

  render() {
    console.log(this.state);

    return (
      <div className='App'>
        <div id='drum-machine' className='drum-machine'>
          <PadBank
            power={this.state.power}
            currentPadBank={this.state.currentpadKit}
            updateDisplay={this.updateDisplay}
          />
          <Control
            power={this.state.power}
            togglePower={this.togglePower}
            selectKit={this.selectKit}
            adjustVolume={this.adjustVolume}
            currentDisplay={this.state.display}
            updateDisplay={this.updateDisplay}
            clearDisplay={this.clearDisplay}
          />
        </div>
      </div>
    );
  }
}

export default App;
