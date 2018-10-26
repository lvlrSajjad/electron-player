import React from 'react';
import SearchForm from './SearchForm';

export default function ActionsMenu(props) {
  return <div style={{ textAlign: 'right', width: 300, marginRight: 32 }}>
    <h2>Electron</h2>
    <ul>
      <li>
        <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.browseFolder}> Browse Folder </a>
        <i className="fa fa-folder-open fa-1x no-drag"/>
      </li>
      <li>
        <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.openFile}> Open
          File </a>
        <i className="fa fa-film fa-1x no-drag"/>
      </li>
    </ul>
    {props.files.length > 0 &&
    <SearchForm
      onInput={props.onSearchInput}
    />
    }
  </div>

  }
