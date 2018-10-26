import React, { Component } from 'react';

// import FaBeer from 'react-icons/fa/beer';

class Toolbar extends Component {
  static close(e) {
    const { remote } = window.require('electron');
    remote.getCurrentWindow().close();
  }

  static maximize(e) {
    const { remote } = window.require('electron');
    if (remote.getCurrentWindow().isFullScreen()|| remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().restore();
    } else {
      remote.getCurrentWindow().setFullScreen(true);
    }
  }

  static minimize(e) {
    const { remote } = window.require('electron');
    remote.getCurrentWindow().minimize();
  }

  render() {
    return (
      <div className="toolbar">
        <i style={{position:'absolute',left:10}} className="fa fa-bars fa-1x no-drag" onClick={()=>this.props.menu()}/>
        {this.props.status.toString().length > 0 &&
        <i style={{position:'absolute',left:35}} className="fa fa-folder-open no-drag"/>
        }
        <h4 style={{position:'absolute',left:64,top:-10}}>{this.props.status}</h4>
        <i className="fa fa-redo fa-1x no-drag" onClick={()=>this.props.onRefresh()}/>
        <i className="fa fa-window-minimize fa-1x no-drag" onClick={Toolbar.minimize}/>
        {/*<i className="fa fa-window-maximize fa-1x no-drag" onClick={Toolbar.maximize}/>*/}
        <i style={{marginRight:15}} className="fa fa-window-close fa-1x no-drag" onClick={Toolbar.close}/>

      </div>
    );
  }
}

export default Toolbar;
