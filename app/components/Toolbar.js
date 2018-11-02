import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import MaterialIcon, { colorPalette } from 'material-icons-react';

const { remote } = window.require('electron');

// import FaBeer from 'react-icons/fa/beer';

class Toolbar extends Component {
  static close(e) {
    const { remote } = window.require('electron');
    remote.getCurrentWindow().close();
  }

  constructor(props){
    super(props);
    this.state={
      isFullScreen:false
    }
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

  fullScreen =()=> {
    this.setState({isFullScreen:!this.state.isFullScreen},()=>{
      if (!this.state.isFullScreen) {
        remote.getCurrentWindow().focus();
        remote.getCurrentWindow().setFullScreen(false);
      } else {
        remote.getCurrentWindow().focus();
        remote.getCurrentWindow().setFullScreen(true);
      }
    });

  }

  render() {
    return (
      <div className="toolbar">
        <a style={{ marginLeft: 16 }} className='no-drag'>
          <MaterialIcon
            icon='menu'
            color='white'
            size={24}
            onClick={() => this.props.menu()}
          />
        </a>
        {this.props.status.toString().length > 0 &&
        <MaterialIcon
          icon='folder-open'
          color='white'
          size={24}
        />
        }
        <h4 style={{ height:24,margin:2 }}>{this.props.status}</h4>

        <div style={{ flex: 1 }}/>
        {this.props.isDataLoading &&
        <ReactLoading className="fa" type='bars' color='#fafafa' height={16} width={20}/>
        }
        {this.props.currentVideo.length > 0 &&
        <a className='no-drag'>
          <MaterialIcon
            icon='stop'
            color='white'
            size={24}
            onClick={() => this.props.onRefresh()}
          />
        </a>
        }
        <a className='no-drag'>

          <MaterialIcon
            icon={this.state.isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
            color='white'
            size={24}
            onClick={this.fullScreen}
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
        <a style={{ marginRight: 16 }} className='no-drag'>

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
