import { Component } from 'react';
import { activeStyle, inactiveStyle } from '../common';

interface PadBankProps {
  power: boolean;
  currentPadBank: {
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
    this.props.power &&
      this.setState((state) => ({
        padStyle: state.padStyle === inactiveStyle ? activeStyle : inactiveStyle
      }));
  }

  playAudio() {
    const audio = document.getElementById(
      this.props.keyTrigger
    ) as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.audioId.replace(/-/g, ' '));
  }

  render() {
    return (
      <div
        className='drum-pad'
        style={this.state.padStyle}
        onClick={this.playAudio}
      >
        <audio
          className='audio'
          id={this.props.keyTrigger}
          src={this.props.audioSource}
        ></audio>
        {this.props.keyTrigger}
      </div>
    );
  }
}

export class PadBank extends Component<PadBankProps> {
  renderPad(
    { keyCode, keyTrigger, id, url }: PadBankProps['currentPadBank'][0],
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
              this.renderPad(this.props.currentPadBank[i * 3 + j], i * 3 + j)
            )}
          </div>
        ))}
      </div>
    );
  }
}
