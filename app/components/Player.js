import React from 'react';
import ReactPlayer from 'react-player';

export default function Player(props) {

  const tracks = [
    {kind: 'subtitles', src: props.currentSub, srcLang: 'fa', default: true}
  ];
  return (
    <ReactPlayer
      controls
      className='player'
      style={{
            boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
            backgroundColor: '#000',
            borderRadius: 8,
            overflow: 'hidden',
          }}
      playing
      url={[
        { src: props.currentVideo, type: 'video/mp4' }
      ]}
      config={{ file: {
          tracks:tracks
        }}}
    />
  );
}
