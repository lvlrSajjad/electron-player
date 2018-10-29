import React from 'react';
import Toolbar from './Toolbar';

const { shell } = require('electron');

export default function FileList(props) {
  const listItems = props.mappedFiles.map((file) => {
      const videoExts = ['mp4', 'mkv'];

      if (videoExts.includes(file.ext)) {
        return <li style={{ textAlign: 'left', margin: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'right' }}>
            <a title="see information" style={{ fontSize: 16, marginRight: 16 }} className="fa fa-info fa-1x no-drag"
               onClick={() => props.onInfoClicked(file.name[0])}/>

            <a style={{ fontSize: 16 }}
               onDoubleClick={() => {
                 openFile(file.path);
                 props.fileOpened();
               }}

               onClick={() => props.playFile(file.path)}
            >
              {file.name[0]}
            </a>
            <a style={{ flex: 1, fontSize: 16, marginLeft: 4 }} onClick={() => {
              props.onGenreClick(file.year.toString());
            }}>{file.year}</a>
            {/*<a style={{ fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {*/}
              {/*props.onGenreClick(file.cast[0]);*/}
            {/*}}>{file.cast[0]}</a>*/}
            <a style={{ fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
              props.onGenreClick(file.genres[0]);
            }}>{file.genres[0]}</a>
            {file.resolution.trim().length > 0 &&
            <a style={{ fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
              props.onGenreClick(file.resolution);
            }}>{file.resolution}</a>
            }
            <a title="show item in folder" style={{ marginRight: 16, fontSize: 16 }}
               className="fa fa-folder-open fa-1x no-drag" onClick={() => shell.showItemInFolder(file.path)}/>
            <a onClick={() => {
              openFile(file.path);
              props.fileOpened();
            }} className="fa fa-play-circle fa-1x no-drag" title="play in default player"
               style={{ fontSize: 16, marginRight: 16 }}> </a>
          </div>
        </li>;
      }
    }
  );

  return (
    <ul className='fileList'>{listItems}</ul>
  );
}

function openFile(file) {
  const { shell } = require('electron');
  console.log(file);
  shell.openItem(file);
}
