import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

// make an interface for Control component from the App.tsx
interface ControlProps {
  power: boolean;
  togglePower: () => void;
  selectKit: () => void;
  currentDisplay: null | string;
  updateDisplay: (name: string) => void;
  clearDisplay: () => void;
  adjustVolume: (volume: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Control extends Component<ControlProps> {
  constructor(props: ControlProps) {
    super(props);
  }

  render() {
    return (
      <div className='control-container'>
        <div className='logo-container'>
          <FontAwesomeIcon icon={faLaptopCode} className='logo' /> ccrsxx
        </div>
        <fieldset>
          <legend className='switch-title'>Power</legend>
          <label className='switch'>
            <input
              type='checkbox'
              defaultChecked={this.props.power}
              onChange={this.props.togglePower}
            />
            <span className='slider'></span>
          </label>
        </fieldset>
        <div className='display-container'>
          <div className='display'>{this.props.currentDisplay}</div>
        </div>
      </div>
    );
  }
}
