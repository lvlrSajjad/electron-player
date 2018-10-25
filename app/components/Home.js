// @flow
import React, { Component } from 'react';
import fs from 'fs';
import recursive from 'recursive-readdir';
import styles from './Home.css';
import FileList from './FileList';
import DragDropView from './DragDropView';
import SearchForm from './SearchForm';
import Toolbar from './Toolbar';

const srt2vtt = require('srt-to-vtt');
const { shell } = require('electron');

type Props = {};

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
};


export default class Home extends Component<Props> {
  props: Props;


  constructor(props) {
    super(props);
    this.state = {
      filesOrg: [],
      files: [],
      currentDirectoryPath: '',
      currentVideo: '',
      currentDirectoryName: '',
      showMenu: true
    };
    this.listFiles = this.listFiles.bind(this);
    this.playFile = this.playFile.bind(this);
    this.search = this.search.bind(this);
    this.scanFiles = this.scanFiles.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.openWithHandler = this.openWithHandler.bind(this);
    this.eventListeners = this.eventListeners.bind(this);
    this.openWithEventListener = this.openWithEventListener.bind(this);
    this.dropEventListener = this.dropEventListener.bind(this);
    this.eventListeners();
  }

  eventListeners() {
    this.dropEventListener();
    this.openWithEventListener();
  }

  dropEventListener() {
    document.body.ondrop = (ev) => {
      const filePath = ev.dataTransfer.files[0].path;
      this.openWithHandler(filePath);
      ev.preventDefault();
    };
  }

  openWithEventListener() {
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


  openWithHandler(filePath) {
    const filePathStr = filePath.toString().toLowerCase();
    console.log(filePathStr);
    if (filePathStr.endsWith('mp4') || filePathStr.endsWith('mkv')) {
      const filePathObj = filePathStr.toString().split('\\');
      const folderPath = `${filePathObj.slice(0, filePathObj.length - 1).join('\\')  }\\`;
      this.playFile(filePathStr.toString());
      this.scanFiles(folderPath);
    } else {
      this.scanFiles(filePath);
    }
  }


  playFile(file) {
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

  listFiles() {
    const { remote } = require('electron');
    remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (filePath) => {
      if (filePath === undefined) {
        console.log('No file selected');
        return;
      }
      this.scanFiles(filePath);
    });
  };


  openFileDialog() {
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

  search(text) {
    console.log(text);
    const fileList = this.state.filesOrg;
    const result = fileList.filter((file) => file.toLowerCase().indexOf(text.toLowerCase()) >= 0
    );
    console.log(result);
    this.setState({ files: result });
  }

  scanFiles(filePath) {
    const dirNameObj = filePath.toString().split('\\');
    const dirName = dirNameObj[dirNameObj.length - 1];
    recursive(filePath.toString(), ['*.MP4', '*.MKV'], (err, items) => {
      if (items !== undefined && items != null) {
        this.setState({
          filesOrg: items,
          files: items,
          currentDirectoryPath: filePath.toString(),
          currentDirectoryName: dirName
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Toolbar
          menu={() => {
            this.setState({ showMenu: !this.state.showMenu });
          }}
          status={this.state.currentDirectoryName}
        />
        <div className={styles.container} data-tid="container">
          {this.state.showMenu &&
          <div style={{ textAlign: 'right', width: 300, marginRight: 32 }}>
            <h2>Electron</h2>
            <ul>
              <li>
                <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={this.listFiles}> Browse Folder </a>
                <i className="fa fa-folder-open fa-1x no-drag"/>
              </li>
              <li>
                <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={this.openFileDialog}> Open
                  File </a>
                <i className="fa fa-film fa-1x no-drag"/>
              </li>
            </ul>
            {this.state.filesOrg.length > 0 &&
            <SearchForm
              onInput={(t) => this.search(t.target.value)}
            />
            }
          </div>
          }
          <div className='playList' style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {(this.state.currentVideo.length === 0 && this.state.files.length === 0) &&
            <DragDropView/>
            }
            {this.state.currentVideo.length > 0 &&
            <video
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
              playsInline
              src={this.state.currentVideo}
            >
              {this.state.currentSub.length > 0 &&
              <track kind="subtitles" label="English - SubRip" src={this.state.currentSub} srcLang="fa" default/>
              }
            </video>
            }
            {this.state.files.length > 0 &&
            <FileList
              fileOpened={() => this.setState({ currentVideo: '' })}
              playFile={this.playFile}
              directory={this.state.currentDirectoryPath}
              files={this.state.files}/>
            }
          </div>
        </div>
      </div>
    );
  }
}
