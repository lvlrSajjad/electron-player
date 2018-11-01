import React from 'react';
import SearchForm from './SearchForm';
import ReactLoading from 'react-loading';

export default function ActionsMenu(props) {
  return <div style={{ textAlign: 'right', width: 300, marginRight: 32 }}>
    <h2>Electron</h2>
    {props.files.length > 0 &&
    <SearchForm
      onInput={props.onSearchInput}
    />
    }
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
      {props.files.length > 0 && <li>
      <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.fetchData}> Fetch Data </a>


      {(props.isDataLoading) ?
        <ReactLoading className="fa" type='bars' color='#fafafa' height={16} width={16}/> :
        <i className="fa fa-database fa-1x no-drag"/>
      }

    </li>}
      {props.files.length > 0 && <li>
        <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.sortDialog}> Sort Movies </a>
          <i className="fa fa-sort fa-1x no-drag"/>
      </li>}
      {props.currentVideo.length > 0 &&
      <li>
        <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.changeSubtitle}> Change Subtitle </a>
        <i className="fa fa-closed-captioning fa-1x no-drag"/>
      </li>
      }
      {props.files.length > 0 && <li>
        <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.setAsDefault}> Set as Default
          Folder </a>
        <i className="fa fa-star fa-1x no-drag"/>
      </li>}
      {props.haveDefaultFolder && <li>
        <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.removeDefaultFolder}> Unset Default
          Folder </a>
        <i className="fa fa-minus fa-1x no-drag"/>
      </li>}
      {props.searchTerm.length > 0 && <li>
        <a style={{ position: 'absolute', left: 16, fontSize: 16 }} onClick={props.resetSearch}> reset Search </a>
        <i className="fa fa-redo fa-1x no-drag"/>
      </li>}

    </ul>

  </div>;

}
