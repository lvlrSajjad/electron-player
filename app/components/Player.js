import React from 'react';

export default function Player(props) {
  return <video
    style={{
      boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
      backgroundColor: '#000',
      width: '95%',
      borderRadius: 8,
      overflow: 'hidden',
      maxHeight: '70%'
    }}
    autoPlay
    controls
    playsinline
    id="player"
    //  id="my-video" class="video-js"
    src={props.currentVideo}
  >
    {props.currentSub.length > 0 &&
    <track kind="subtitles" label="English - SubRip" src={props.currentSub} srcLang="fa" default/>
    }
  </video>

  }
