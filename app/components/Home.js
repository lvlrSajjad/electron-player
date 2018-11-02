// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import FileList from './FileList';
import DragDropView from './DragDropView';
import Toolbar from './Toolbar';
import * as util from './util/Home';
import MovieInfo from './MovieInfoModal';
import Player from './Player';
import ActionsMenu from './ActionsMenu';
import ReactLoading from 'react-loading';
import Worker from 'worker-loader!../myWorker.js';

type Props = {};


document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
};

let worker = new Worker();
worker.postMessage({func:'importNedb'});

export default class Home extends Component<Props> {

  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      mappedFilesOrg: [],
      mappedFiles: [],
      currentDirectoryPath: '',
      currentVideo: '',
      currentDirectoryName: '',
      showMenu: true,
      modalIsOpen: false,
      haveDefaultFolder: false,
      isLoading: false,
      showSortModal: false,
      isDataLoading:false,
      fetchedPercent: 0,
      searchTerm: '',
      currentInfo: {
        Title: '',
        Director: '',
        Year: '',
        Genre: '',
        Actors: ''
      }
    };
    this.listFiles = util.listFiles.bind(this);
    this.playFile = util.playFile.bind(this);
    this.search = util.search.bind(this);
    this.scanFiles = util.scanFiles.bind(this);
    this.openFileDialog = util.openFileDialog.bind(this);
    this.openWithHandler = util.openWithHandler.bind(this);
    this.eventListeners = util.eventListeners.bind(this);
    this.openWithEventListener = util.openWithEventListener.bind(this);
    this.dropEventListener = util.dropEventListener.bind(this);
    this.openModal = util.openModal.bind(this);
    this.afterOpenModal = util.afterOpenModal.bind(this);
    this.closeModal = util.closeModal.bind(this);
    this.refresh = util.refresh.bind(this);
    this.changeSubtitle = util.changeSubtitle.bind(this);
    this.setDefaultFolder = util.setDefaultFolder.bind(this);
    this.eventListeners();
    util.loadDefaultFolder(this);


  }

  terminateWorker = ()=>{
    worker.terminate();
    worker = new Worker();
    worker.postMessage({func:'importNedb'});
  };
  callDbWorker = (files)=>{
   const electron = require('electron');
   const app = electron.remote.app;
    this.setState({isDataLoading:true,fetchedPercent:0},()=>{
      worker.addEventListener('message',(e) => {
        if (e.data.msg === 'scanningFinished'){
          this.setState(e.data.data)
        } else if (e.data.msg === 'onPercent') {
          this.setState(e.data.data)
        }else if (e.data.msg === 'fetchingFinished') {
          this.setState(e.data.data)
        }
      });
      worker.postMessage({func:'firstLoop',files:files,appPath:app.getAppPath('UserData')+'\\movies.db'})
    })
  };


  myFunction(message) {
    // Get the snackbar DIV
    this.setState({ message: message });
    var x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
      x.className = x.className.replace('show', '');
    }, 2000);
  }


  render() {
    return (
      <div>

        <Toolbar
          menu={() => {
            this.setState({ showMenu: !this.state.showMenu });
          }}
          status={this.state.currentDirectoryName}
          onRefresh={this.refresh}
          currentVideo={this.state.currentVideo}
          isDataLoading={this.state.isDataLoading}
        />

        <div className={styles.container} data-tid="container">
          {this.state.showMenu &&
          <ActionsMenu browseFolder={this.listFiles}
                       openFile={this.openFileDialog}
                       onSearchInput={(t) => this.search(t.target.value)}
                       currentVideo={this.state.currentVideo}
                       changeSubtitle={this.changeSubtitle}
                       setAsDefault={this.setDefaultFolder}
                       haveDefaultFolder={this.state.haveDefaultFolder}
                       removeDefaultFolder={() => util.removeDefaultFolder(this)}
                       searchTerm={this.state.searchTerm}
                       resetSearch={() => this.search('')}
                       isDataLoading={this.state.isDataLoading}
                       sortDialog={() => {
                         this.setState({ showSortModal: true });
                       }}
                       fetchedPercent={this.state.fetchedPercent}
                       files={this.state.mappedFilesOrg}/>
          }
          <div className='playList' style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {(this.state.currentVideo.length === 0 && this.state.mappedFiles.length === 0) &&
            <DragDropView/>
            }
            {this.state.currentVideo.length > 0 &&
            <Player currentVideo={this.state.currentVideo}
                    currentSub={this.state.currentSub}
                    onMessage={(msg) => this.myFunction(msg)}
            />
            }
            {this.state.mappedFiles.length > 0 &&
            <FileList fileOpened={() => this.setState({ currentVideo: '' })}
                      playFile={this.playFile}
                      directory={this.state.currentDirectoryPath}
                      mappedFiles={this.state.mappedFiles}
                      onGenreClick={(genre) => {
                        this.search(genre);
                      }}
                      isDataLoading={this.state.isDataLoading}
                      onInfoClicked={(title) => this.openModal(title, this)}/>
            }
          </div>

        </div>
        {this.state.isDataLoading &&
        <div style={{
          position: 'absolute',
          top: 45,
          height: 1,
          left: 0,
          borderRadius: 2,
          width: this.state.fetchedPercent + '%',
          backgroundColor: '#4FC3F7',
          boxShadow: '0px 0px 8px 1px #29B6F6'
        }}/>
        }
        {this.state.modalIsOpen &&
        <MovieInfo poster={this.state.currentInfo.Poster}
                   title={this.state.currentInfo.Title}
                   released={this.state.currentInfo.Released}
                   genre={this.state.currentInfo.Genre}
                   director={this.state.currentInfo.Director}
                   actors={this.state.currentInfo.Actors}
                   imdbRating={this.state.currentInfo.imdbRating}
                   metascore={this.state.currentInfo.Metascore}
                   awards={this.state.currentInfo.Awards}
                   closeModal={() => this.closeModal()}/>
        }

        {this.state.isLoading &&
        <div style={{ alignItems: 'center', justifyContent: 'center' }}
             className='blurredOverlay'>
          <ReactLoading type='cylon'/>
        </div>
        }
        {this.state.showSortModal &&
        <div style={{
          alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'
        }}
             onClick={() => this.setState({ showSortModal: false })} className='blurredOverlay'>
          <ul style={{ width: 400 }}>
            <li style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'left', display: 'flex' }}>
              <a style={{ flex: 1 }} onClick={() => {this.sortArray('rate')}}> By Rating </a>
              <i className="fa fa-star fa-1x no-drag"/>
            </li>
            <li style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'left', display: 'flex' }}>
              <a style={{ flex: 1 }} onClick={() => {this.sortArray('name')}}> By Name </a>
              <i className="fa fa-language fa-1x no-drag"/>
            </li>
            <li style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'left', display: 'flex' }}>

              <a style={{ flex: 1 }} onClick={() => {this.sortArray('year')}}>By Year</a>
              <i className="fa fa-calendar fa-1x no-drag"/>
            </li>

          </ul>
        </div>
        }
        <div id="snackbar">{this.state.message}</div>

      </div>
    );
  }

  run =(fn) => {
    return new Worker(URL.createObjectURL(new Blob(['('+fn+')()'])));
  };
  sortArray = (param) => {
    let unsortedArray = this.state.mappedFiles;
    if (param === 'name') {
      unsortedArray.sort((a, b) => {
        const nameA = a.name.toString().toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toString().toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });

    } else if (param === 'rate') {
      unsortedArray.sort((a, b) => {
          const rateA = parseFloat(a.rating); // ignore upper and lowercase
          const rateB = parseFloat(b.rating); // ignore upper and lowercase
          return rateB - rateA;

      });

    } else if (param === 'year') {
      unsortedArray.sort((a, b) => {
        const yearA = parseInt(a.year); // ignore upper and lowercase
        const yearB = parseInt(b.year); // ignore upper and lowercase
        return yearB - yearA;
      });
    }
    this.setState({mappedFiles:unsortedArray})
  };
}
