import { Component } from 'react';
import { triggerKeys } from '../common';

export class DrumPad extends Component {
  render() {
    return (
      <div className='drum-pad-container'>
        {[...Array(3)].map((_, i) => (
          <div className='drum-pad-row' key={i}>
            {[...Array(3)].map((_, j) => (
              <div className='drum-pad' key={j}>
                {triggerKeys[i * 3 + j]}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
