import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

interface ControlProps {
  power: boolean;
  currentDisplay: null | string;
  currentVolume: number;
  currentPadKitId: string;
  togglePower: () => void;
  selectKit: () => void;
  adjustVolume: (volume: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Control = (props: ControlProps) => (
  <div className='control-container'>
    <div className='logo-container'>
      <FontAwesomeIcon icon={faLaptopCode} className='logo' /> ccrsxx
    </div>
    <fieldset className='power-container'>
      <legend className='switch-title'>Power</legend>
      <label className='switch'>
        <input
          type='checkbox'
          defaultChecked={props.power}
          onChange={props.togglePower}
        />
        <span className='slider'></span>
      </label>
    </fieldset>
    <div
      id='display'
      style={props.power ? {} : { backgroundColor: 'gray' }}
      className='display-container'
    >
      <div className='display'>{props.currentDisplay}</div>
    </div>
    <div className='slider-container'>
      <input
        style={props.power ? {} : { backgroundColor: 'gray' }}
        className='slider'
        type='range'
        min={0}
        max={1}
        step={0.01}
        value={props.currentVolume}
        onChange={props.adjustVolume}
      />
    </div>
    <div className='kit-container'>
      <fieldset>
        <legend className='switch-title'>Heater</legend>
        <legend className='switch-title'>Kit</legend>
        <label className='switch'>
          <input
            type='checkbox'
            defaultChecked={
              props.currentPadKitId === 'Heater Kit' ? false : true
            }
            onChange={props.selectKit}
            disabled={!props.power}
          />
          <span
            style={props.power ? {} : { backgroundColor: 'gray' }}
            className='slider'
          ></span>
        </label>
        <legend className='switch-title'>Piano</legend>
      </fieldset>
    </div>
  </div>
);
