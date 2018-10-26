import React from 'react';
import Toolbar from './Toolbar';

export default function FileList(props) {
  const listItems = props.files.map((file) => {
      const fileExt = file.substr(file.length - 3);
      const videoExts = ['mp4', 'mkv'];

      if (videoExts.includes(fileExt)) {
        return <li style={{ textAlign: 'left', margin: 8 }}>
          <i style={{marginRight:16}} className="fa fa-info fa-1x no-drag" onClick={()=>props.onInfoClicked(fileNameCorrector(file,fileExt)[0])}/>

          <a style={{ fontSize: 16 }}
             onDoubleClick={() => {
               openFile(file);
               props.fileOpened();
             }}
             onClick={() => props.playFile(file)}
          >
            {fileNameCorrector(file,fileExt)}
          </a>

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

function fileNameCorrector(string,ext) {
  const stringObj = string.split('\\');

  const fileName = stringObj[stringObj.length-1];

  return fileName
    .replace(`.${ext}`,'')
    .replace(/\(/gi,'')
    .replace(/\)/gi,'')
    .replace(/\[/gi,'')
    .replace(/]/gi,'')
    .replace(/\./g,' ')
    .replace(/_/gi,' ')
    .replace(/-/gi,' ')
    .split(/(?=([0-9]{4})+)/)
    .slice(0,2)
}
