import { Component } from 'react';
import { PadBank, Control } from './components';
import { heaterKit, pianoKit } from './common';

interface AppStates {
  power: boolean;
  display: null | string;
  currentPadKit: typeof heaterKit;
  currentPadKitId: 'Heater Kit' | 'Smooth Piano Kit';
  sliderValue: number;
}

class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      power: true,
      display: null,
      currentPadKit: heaterKit,
      currentPadKitId: 'Heater Kit',
      sliderValue: 0.6
    };
    this.togglePower = this.togglePower.bind(this);
    this.toggleKit = this.toggleKit.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  componentDidUpdate() {
    [
      ...(document.getElementsByClassName(
        'clip'
      ) as HTMLCollectionOf<HTMLAudioElement>)
    ].forEach((audio) => (audio.volume = this.state.sliderValue));
  }

  togglePower() {
    this.setState((state) => ({
      power: !state.power,
      display: state.power ? 'Power Off' : 'Power On'
    }));
    setTimeout(() => {
      this.clearDisplay();
    }, 2000);
  }

  toggleKit() {
    this.state.power && this.state.currentPadKitId === 'Heater Kit'
      ? this.setState({
          display: 'Smooth Piano Kit',
          currentPadKit: pianoKit,
          currentPadKitId: 'Smooth Piano Kit'
        })
      : this.setState({
          display: 'Heater Kit',
          currentPadKit: heaterKit,
          currentPadKitId: 'Heater Kit'
        });
  }

  adjustVolume(volume: React.ChangeEvent<HTMLInputElement>) {
    if (this.state.power) {
      this.setState({
        sliderValue: volume.target.valueAsNumber,
        display: `Volume: ${Math.round(volume.target.valueAsNumber * 100)}`
      });
      setTimeout(() => this.clearDisplay(), 2000);
    }
  }

  updateDisplay(name: string) {
    this.state.power && this.setState({ display: name });
  }

  clearDisplay() {
    this.setState({ display: null });
  }

  render() {
    return (
      <div className='App'>
        <div
          id='drum-machine'
          className={`drum-machine`}
          style={this.state.power ? { borderColor: 'orange' } : {}}
        >
          <PadBank
            power={this.state.power}
            currentPadKit={this.state.currentPadKit}
            updateDisplay={this.updateDisplay}
          />
          <Control
            power={this.state.power}
            currentVolume={this.state.sliderValue}
            currentDisplay={this.state.display}
            currentPadKitId={this.state.currentPadKitId}
            togglePower={this.togglePower}
            selectKit={this.toggleKit}
            adjustVolume={this.adjustVolume}
          />
        </div>
      </div>
    );
  }
}

export default App;
