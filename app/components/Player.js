import React from 'react';
import ReactPlayer from 'react-player';

export default class Player extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      volume:1,
      playing:true
    };

    window.addEventListener('keyup', (ev) => {
      console.log(ev)
      switch (ev.key) {
         case 'ArrowRight': {
          this.currentPlayer.seekTo(this.currentPlayer.getCurrentTime() + 10);
           this.props.onMessage('10 Seconds Forward');

           break;
        }
        case 'ArrowLeft': {
          this.currentPlayer.seekTo(this.currentPlayer.getCurrentTime() - 10);
          this.props.onMessage('10 Seconds Back');
          break;
        }
        case 'ArrowUp' : {
          if (this.state.volume + 0.1 <= 1) {
            this.setState({volume:this.state.volume + 0.1},()=>{
              this.props.onMessage('Volume: '+Math.round(this.state.volume*100)+'%');
            });
          }
          break;
        }
        case 'ArrowDown' : {
          if (this.state.volume - 0.1 > 0) {
            this.setState({volume:this.state.volume - 0.1},()=>{
              this.props.onMessage('Volume: '+Math.round(this.state.volume*100)+'%');
            });
          }

          break;
        }
        case ' ' : {
          this.setState({playing:!this.state.playing},()=>{
            this.props.onMessage(this.state.playing? 'Playing':'Paused');
          });
          break;
        }
      }
    }, true);
  }




  render() {
    const tracks = [
      { kind: 'subtitles', src: this.props.currentSub, srcLang: 'fa', default: true }
    ];

    return (
      <ReactPlayer
        controls
        className='player'
        ref={player => {
          this.currentPlayer = player;
        }}
        style={{
          boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
          backgroundColor: '#000',
          borderRadius: 8,
          overflow: 'hidden'
        }}
        playing = {this.state.playing}
        url={[
          { src: this.props.currentVideo, type: 'video/mp4' }
        ]}
        config={{
          file: {
            tracks: tracks
          }
        }}
        volume={this.state.volume}
      >

      </ReactPlayer>

    );
  }
}
