import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import MaterialIcon, {colorPalette} from 'material-icons-react';
const { remote } = window.require('electron');

// import FaBeer from 'react-icons/fa/beer';

class Toolbar extends Component {
  static close(e) {
    const { remote } = window.require('electron');
    remote.getCurrentWindow().close();
  }

  static maximize(e) {
    if (remote.getCurrentWindow().isFullScreen() || remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().restore();
    } else {
      remote.getCurrentWindow().setFullScreen(true);
    }
  }

  static minimize(e) {
    remote.getCurrentWindow().minimize();
  }

  static fullScreen(){
    if (remote.getCurrentWindow().isFullScreen()){
      remote.getCurrentWindow().focus();
      remote.getCurrentWindow().setFullScreen(false);
    } else{
      remote.getCurrentWindow().focus();
      remote.getCurrentWindow().setFullScreen(true);
    }
  }

  render() {
    return (
      <div className="toolbar">
        <a style={{marginLeft:16}} className='no-drag'>
        <MaterialIcon
          icon='menu'
          color='white'
          size={24}
          onClick={() => this.props.menu()}
        />
        </a>
        {this.props.status.toString().length > 0 &&
        <i style={{ position: 'absolute', left: 35 }} className="fa fa-folder-open no-drag"/>
        }
        <h4 style={{ position: 'absolute', left: 64, top: -10 }}>{this.props.status}</h4>

        <div style={{ flex: 1 }}/>
        {this.props.isDataLoading &&
        <ReactLoading className="fa" type='bars' color='#fafafa' height={16} width={20}/>
        }
        <a className='no-drag'>
        <MaterialIcon
          icon='stop'
          color='white'
          size={24}
          onClick={() => this.props.onRefresh()}
        />
        </a>
        <a className='no-drag'>

        <MaterialIcon
          icon={remote.getCurrentWindow().isFullScreen() ? 'fullscreen_exit' :'fullscreen'}
          color='white'
          size={24}
          onClick={Toolbar.fullScreen}
        />
        </a>
        <a className='no-drag'>

        <MaterialIcon
          icon='minimize'
          color='white'
          size={24}
          onClick={Toolbar.minimize}
        />
        </a>
        <a style={{marginRight:16}} className='no-drag'>

        <MaterialIcon
          icon='close'
          color='white'
          size={24}
          onClick={Toolbar.close}
        />
        </a>
      </div>
    );
  }
}

export default Toolbar;
