// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import FileList from './FileList';
import DragDropView from './DragDropView';
import SearchForm from './SearchForm';
import Toolbar from './Toolbar';
import * as util from './util/Home'
import Plyr from 'plyr';
import MovieInfo from './MovieInfoModal';
import Player from './Player';
import ActionsMenu from './ActionsMenu';

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
      showMenu: true,
      modalIsOpen: false,
      currentInfo:{
        Title:'',
        Director:'',
        Year:'',
        Genre:'',
        Actors:''
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

    this.eventListeners();

    const player = new Plyr('#player');

    // Expose
    window.player = player;

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
          <ActionsMenu
          browseFolder={this.listFiles}
          openFile={this.openFileDialog}
          onSearchInput={(t) => this.search(t.target.value)}
          files={this.state.filesOrg}
          />
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
            <Player
              currentVideo = {this.state.currentVideo}
              currentSub = {this.state.currentSub}
            />
            }
            {this.state.files.length > 0 &&
            <FileList
              fileOpened={() => this.setState({ currentVideo: '' })}
              playFile={this.playFile}
              directory={this.state.currentDirectoryPath}
              files={this.state.files}
              onInfoClicked={(title)=>this.openModal(title,this)}
            />
            }
          </div>
        </div>
        {this.state.modalIsOpen && <MovieInfo
          poster = {this.state.currentInfo.Poster}
          title = {this.state.currentInfo.Title}
          released = {this.state.currentInfo.Released}
          genre = {this.state.currentInfo.Genre}
          director = {this.state.currentInfo.Director}
          actors = {this.state.currentInfo.Actors}
          imdbRating = {this.state.currentInfo.imdbRating}
          metascore = {this.state.currentInfo.Metascore}
          awards = {this.state.currentInfo.Awards}
          closeModal={()=>this.closeModal()}
        />
        }
      </div>
    );
  }
}
