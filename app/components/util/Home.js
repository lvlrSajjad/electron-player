import axios from 'axios/index';
import fs from 'fs';
import recursive from 'recursive-readdir';
import srt2vtt from 'srt-to-vtt';
import storage from 'electron-json-storage';

export function openModal(title, context) {
  axios.get('http://www.omdbapi.com/?t=' + title.replace(' ', '+') + '&apikey=b7fd46c5')
    .then(function(response) {
      // handle success
      context.setState({ currentInfo: response.data, modalIsOpen: true });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

export function changeSubtitle() {
  const { remote } = require('electron');
  remote.dialog.showOpenDialog({
    filters: [
      { name: 'Subtitles', extensions: ['srt'] }
    ],
    properties: ['openFile']
  }, (filePath) => {
    if (filePath === undefined) {
      console.log('No file selected');
      return;
    }
    fs.createReadStream(filePath.toString())
      .pipe(srt2vtt())
      .pipe(fs.createWriteStream(filePath.toString().replace(/.{3}$/, 'vtt'))
        .on('finish', () => {
          this.setState({ currentSub: filePath.toString().replace(/.{3}$/, 'vtt') });
        })
      );
  });
}

export function loadDefaultFolder(ctx) {
  storage.get('settings', function(error, data) {
    if (error) throw error;
    if (data.defaultFolder !== undefined && data.defaultFolder !== null) {
      ctx.setState({ haveDefaultFolder: true, isLoading: true }, () => {
        ctx.scanFiles(data.defaultFolder);
      });
    } else {
      ctx.setState({ haveDefaultFolder: false, isLoading: false });
    }
  });
}

export function removeDefaultFolder(ctx) {
  storage.remove('settings', function(error) {
    if (error) throw error;
    ctx.setState({ haveDefaultFolder: false });
  });
}

export function setDefaultFolder() {
  const storage = require('electron-json-storage');
  this.setState({ haveDefaultFolder: true });

// Write
  storage.set('settings', { defaultFolder: this.state.currentDirectoryPath });
}

export function afterOpenModal() {
  // references are now sync'd and can be accessed.
  this.subtitle.style.color = '#f00';
}

export function closeModal() {
  this.setState({ modalIsOpen: false });
}

export function eventListeners() {
  this.dropEventListener();
  this.openWithEventListener();
}

export function dropEventListener() {
  document.body.ondrop = (ev) => {
    const filePath = ev.dataTransfer.files[0].path;
    this.openWithHandler(filePath);
    ev.preventDefault();
  };
}

export function openWithEventListener() {
  try {
    const electron = require('electron');
    const app = electron.remote;
    if (app.process.argv.length >= 2) {
      const filePath = app.process.argv[1];
      this.openWithHandler(filePath);
    }
  } catch (e) {
    console.log(e);
  }
}


export function openWithHandler(filePath) {
  const filePathStr = filePath.toString().toLowerCase();
  if (filePathStr.endsWith('mp4') || filePathStr.endsWith('mkv')) {
    const filePathObj = filePathStr.toString().split('\\');
    const folderPath = `${filePathObj.slice(0, filePathObj.length - 1).join('\\')  }\\`;
    this.playFile(filePathStr.toString());
    this.scanFiles(folderPath);
  } else {
    this.scanFiles(filePath);
  }
}


export function playFile(file) {
  fs.exists(file.replace(/.{3}$/, 'srt'), (exists) => {
    if (exists) {
      fs.createReadStream(file.replace(/.{3}$/, 'srt'))
        .pipe(srt2vtt())
        .pipe(fs.createWriteStream(file.replace(/.{3}$/, 'vtt'))
          .on('finish', () => {
            this.setState({ currentVideo: file, currentSub: file.replace(/.{3}$/, 'vtt') });
          })
        );
    } else {
      this.setState({ currentVideo: file, currentSub: '' });
    }
  });
}

export function refresh() {
  this.setState({
    filesOrg: [],
    files: [],
    currentDirectoryPath: '',
    currentVideo: '',
    currentDirectoryName: '',
    currentInfo: {
      Title: '',
      Director: '',
      Year: '',
      Genre: '',
      Actors: ''
    },
    searchTerm: ''
  });
}

export function listFiles() {
  const { remote } = require('electron');
  remote.dialog.showOpenDialog({
    properties: ['openDirectory']
  }, (folderPath) => {
    if (folderPath === undefined) {
      console.log('No file selected');
      return;
    }
    this.scanFiles(folderPath);
  });
};


export function openFileDialog() {
  const { remote } = require('electron');
  remote.dialog.showOpenDialog({
    filters: [
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }
    ],
    properties: ['openFile']
  }, (filePath) => {
    if (filePath === undefined) {
      console.log('No file selected');
      return;
    }
    const filePathObj = filePath.toString().split('\\');
    const folderPath = `${filePathObj.slice(0, filePathObj.length - 1).join('\\')  }\\`;
    this.playFile(filePath.toString());
    this.scanFiles(folderPath);
  });
};

export function search(text) {
  if (!this.state.isDataLoading) {
    const fileList = this.state.mappedFilesOrg;
    const result = fileList.filter((file) => {
        const searchRes = file.path.toLowerCase() +
          file.genres.join(' ').toLowerCase() +
          file.cast.join(' ').toLowerCase() +
          file.director.toLowerCase() +
          file.encoder.toLowerCase()+
          file.coding.toLowerCase()+
          file.type.toLowerCase()+
          file.rating.toLowerCase();
        return searchRes.indexOf(text.toLowerCase()) >= 0;
      }
    );
    this.setState({ mappedFiles: result, searchTerm: text });
  } else {
    this.myFunction('Please  Wait Until Data Loading Finishes');
  }
}

function ignoreFunc(file, stats) {
  const ext = file.substr(file.length - 3).toLowerCase().trim();
  console.log(ext);
  console.log(ext !== 'mkv' && ext !== 'mp4');
  return (ext !== 'mkv' && ext !== 'mp4');
}

// $where: function () { return Object.keys(this) > 6; }
export async function scanFiles(filePath) {
  const dirNameObj = filePath.toString().split('\\');
  const dirName = dirNameObj[dirNameObj.length - 1];
  this.setState({
    currentDirectoryPath: filePath.toString(),
    currentDirectoryName: dirName
  });
  recursive(filePath.toString(), (err, items) => {

    if (items !== undefined) {
      items = items.filter(file => {
        const ext = file.substr(file.length - 3).toLowerCase().trim();
        return (ext === 'mkv' || ext === 'mp4');
      });
      this.setState({ isLoading: true });
      if (this.state.mappedFilesOrg.length > 0){
        this.terminateWorker();
      }
      this.callDbWorker(items);
    }
  });
}
