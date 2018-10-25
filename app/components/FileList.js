import React from 'react';

export default function FileList(props) {
  const listItems = props.files.map((file) => {
      const fileExt = file.substr(file.length - 3);
      const videoExts = ['mp4', 'mkv'];

      if (videoExts.includes(fileExt)) {
        return <li style={{ textAlign: 'left', margin: 8 }}>
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
    .replace(/\.ir/gi,'')
    .replace(/\.com/gi,'')
    .replace(/\(/gi,'')
    .replace(/\)/gi,'')
    .replace(/\[/gi,'')
    .replace(/]/gi,'')
    .replace(/\./g,' ')
    .replace(/_/gi,' ')
    .replace(/-/gi,' ')
    .replace(/Ganool/gi,'')
    .replace(/ CO/g,'')
    .replace(/ Org/gi,'')
    .replace(/ HarmonyDl/gi,'')
    .replace(/My Film/gi,'')
    .replace(/MovIran/gi,'')
    .replace(/AVADL/gi,'')
    .replace(/Biz/gi,'')
    .replace(/\www/gi,'')
    .replace(/30NAMA/gi,'')
    .replace(/FardaDownload/gi,'')
    .replace(/SamSerial/gi,'')
    .replace(/Film2Movie/gi,'')
    .replace(/ GAN/gi,'')
    .replace(/ TinyMoviez/gi,'')
    .replace(/ Tmovz/gi,'')
    .replace(/ ir/gi,'')
    .replace(/ me/gi,'')
    .replace(/b lu ry/gi,'')
    .replace(/PERSIAN/gi,'')
    .replace(/Downloadha/gi,'')
    .replace(/DLHA/gi,'')
    .replace(/720p/gi,'')
    .replace(/1080p/gi,'')
    .replace(/6ch/gi,'')
    .replace(/5 1ch/gi,'')
    .replace(/5 1ch/gi,'')
    .replace(/mkvcage/gi,'')
    .replace(/ganool/gi,'')
    .replace(/shaanig/gi,'')
    .replace(/ by /gi,'')
    .replace(/ariamovie/gi,'')
    .replace(/ brrip/gi,'')
    .replace(/ blueray/gi,'')
    .replace(/ x265/gi,'')
    .replace(/ hevc/gi,'')
    .replace(/ x264/gi,'')
    .replace(/ bluray/gi,'')
    .replace(/ yify/gi,'')
    .replace(/ hdtv/gi,'')
    .replace(/ x0r/gi,'')
    .replace(/ ac3/gi,'')
    .replace(/ BaranMovie/gi,'')
    .replace(/ bd/gi,'')
    .replace(/ rip/gi,'')
    .replace(/Top2download/gi,'')
    .replace(/\(\)/gi,'')
    .replace(/\[]/gi,'')

}
