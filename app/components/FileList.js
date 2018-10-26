import React from 'react';
import Toolbar from './Toolbar';

const { shell } = require('electron');

export default function FileList(props) {
  const listItems = props.files.map((file) => {
      const fileExt = file.substr(file.length - 3);
      const videoExts = ['mp4', 'mkv'];

      if (videoExts.includes(fileExt)) {
        return <li style={{ textAlign:'left', margin: 8 }}>
          <div style={{display:'flex',flexDirection:'row',alignSelf: 'right'}}>
          <a title="see information" style={{ fontSize: 16, marginRight: 16 }} className="fa fa-info fa-1x no-drag"
             onClick={() => props.onInfoClicked(fileNameCorrector(file, fileExt)[0])}/>

          <a style={{ flex:1,fontSize: 16 }}
             onDoubleClick={() => {
               openFile(file);
               props.fileOpened();
             }}

             onClick={() => props.playFile(file)}
          >
            {fileNameCorrector(file, fileExt)}
          </a>
          <a title="show item in folder" style={{ marginRight: 16, fontSize: 16 }}
             className="fa fa-folder-open fa-1x no-drag" onClick={() => shell.showItemInFolder(file)}/>
          <a onClick={() => {
            openFile(file);
            props.fileOpened();
          }} className="fa fa-play-circle fa-1x no-drag" title="play in default player"
             style={{ fontSize: 16, marginRight: 16,  }}> </a>
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

function fileNameCorrector(string, ext) {
  const stringObj = string.split('\\');

  const fileName = stringObj[stringObj.length - 1];

  return fileName
    .replace(`.${ext}`, '')
    .replace(/\(/gi, '')
    .replace(/\)/gi, '')
    .replace(/\[/gi, '')
    .replace(/]/gi, '')
    .replace(/\./g, ' ')
    .replace(/_/gi, ' ')
    .replace(/-/gi, ' ')
    .split(/(?=([0-9]{4})+)/)
    .slice(0, 2);
}
