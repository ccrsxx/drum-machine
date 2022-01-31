import { Component } from 'react';
import { activeStyle, offActiveStyle, inactiveStyle } from '../common';

interface PadBankProps {
  power: boolean;
  currentPadKit: {
    keyCode: number;
    keyTrigger: string;
    id: string;
    url: string;
  }[];
  updateDisplay: (name: string) => void;
}

interface DrumPadProps {
  power: boolean;
  updateDisplay: PadBankProps['updateDisplay'];
  keyCode: number;
  keyTrigger: string;
  audioId: string;
  audioSource: string;
}

interface DrumPadStates {
  padStyle: {
    backgroundColor: string;
    boxShadow: string;
    height?: string;
    marginTop?: string;
  };
}

class DrumPad extends Component<DrumPadProps, DrumPadStates> {
  constructor(props: DrumPadProps) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(input: KeyboardEvent) {
    input.keyCode === this.props.keyCode && this.playAudio();
  }

  activatePad() {
    this.setState((state) => ({
      padStyle:
        state.padStyle !== offActiveStyle && !this.props.power
          ? offActiveStyle
          : state.padStyle === inactiveStyle
          ? activeStyle
          : inactiveStyle
    }));
  }

  playAudio() {
    this.activatePad();
    if (this.props.power) {
      const audio = document.getElementById(
        this.props.keyTrigger
      ) as HTMLAudioElement;
      audio.currentTime = 0;
      audio.play();
      this.props.updateDisplay(this.props.audioId.replace(/-/g, ' '));
    }
    setTimeout(() => this.activatePad(), 100);
  }

  render() {
    return (
      <div
        id={this.props.audioId}
        className='drum-pad'
        style={this.state.padStyle}
        onClick={this.playAudio}
      >
        <audio
          id={this.props.keyTrigger}
          className='clip'
          src={this.props.audioSource}
        ></audio>
        {this.props.keyTrigger}
      </div>
    );
  }
}

export class PadBank extends Component<PadBankProps> {
  renderPad(
    { keyCode, keyTrigger, id, url }: PadBankProps['currentPadKit'][0],
    key: number
  ) {
    return (
      <DrumPad
        key={key}
        power={this.props.power}
        updateDisplay={this.props.updateDisplay}
        keyCode={keyCode}
        keyTrigger={keyTrigger}
        audioId={id}
        audioSource={url}
      />
    );
  }

  render() {
    return (
      <div className='drum-pad-container'>
        {[...Array(3)].map((_, i) => (
          <div className='drum-pad-row' key={i}>
            {[...Array(3)].map((_, j) =>
              this.renderPad(this.props.currentPadKit[i * 3 + j], i * 3 + j)
            )}
          </div>
        ))}
      </div>
    );
  }
}
