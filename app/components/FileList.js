import React from 'react';

const { shell } = require('electron');

export default function FileList(props) {
  const listItems = props.mappedFiles.map((file) => {
      const videoExts = ['mp4', 'mkv'];
      if (videoExts.includes(file.ext)) {
        console.log(file);
        return <li key={file.path} style={{ textAlign: 'left', margin: 8 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'right',
            backgroundColor: '#212121',
            borderRadius: 4,
            padding: 8,
            boxShadow: '0px 0px 4px 1px rgba(0,0,0,0.2)'

          }}>
            <div style={{
              color: '#fafafa',
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignSelf: 'right',
              alignItems: 'center',
              justifyContent: 'left'
            }}>
              <a title="see information" style={{ color: '#fafafa', fontSize: 16, marginRight: 16, alignItems: 'center' }}
                 className="fa fa-info fa-1x no-drag"
                 onClick={() => props.onInfoClicked(file.name[0])}/>

              <a style={{ color: '#fafafa', fontSize: 16 }}
                 onDoubleClick={() => {
                   openFile(file.path);
                   props.fileOpened();
                 }}

                 onClick={() => props.playFile(file.path)}
              >
                {file.name[0]}
              </a>
              <a style={{ color: '#fafafa', flex: 1, fontSize: 16, marginLeft: 4 }} onClick={() => {
                props.onGenreClick(file.year.toString());
              }}>{file.year}</a>
              {file.type.trim().length > 0 &&
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
                props.onGenreClick(file.type);
              }}>{file.type}</a>
              }
              {file.encoder.trim().length > 0 &&
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
                props.onGenreClick(file.encoder);
              }}>{file.encoder}</a>
              }
              {file.coding.trim().length > 0 &&
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
                props.onGenreClick(file.coding);
              }}>{file.coding}</a>
              }
              {file.resolution.trim().length > 0 &&
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
                props.onGenreClick(file.resolution);
              }}>{file.resolution}</a>
              }
              <a title="show item in folder" style={{ color: '#fafafa', marginRight: 16, fontSize: 16 }}
                 className="fa fa-folder-open fa-1x no-drag" onClick={() => shell.showItemInFolder(file.path)}/>
              <a onClick={() => {
                openFile(file.path);
                props.fileOpened();
              }} className="fa fa-play-circle fa-1x no-drag" title="play in default player"
                 style={{ color: '#fafafa', fontSize: 16, marginRight: 16 }}> </a>
            </div>

              <div style={{
                fontSize: 12,
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                alignSelf: 'right',
                alignItems: 'center',
                justifyContent: 'left',
                marginTop: 8,
                marginBottom: 4
              }}>
                <b style={{ color: '#fafafa', fontSize: 12 }}>Rating: </b>
                <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 8 }} onClick={() => {
                  props.onGenreClick(file.rating);
                }}>{file.rating}</a>
              </div>
            <div style={{
              fontSize: 12,
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignSelf: 'right',
              alignItems: 'center',
              justifyContent: 'left',
              marginTop: 8,
              marginBottom: 4
            }}>
              <b style={{ color: '#fafafa', fontSize: 12,marginRight:4 }}>Genre: </b>

              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 8 }} onClick={() => {
                props.onGenreClick(file.genres[0]);
              }}>{file.genres[0]}</a>
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
                props.onGenreClick(file.genres[1]);
              }}>{file.genres[1]}</a>

            </div>
            <div style={{
              fontSize: 12,
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignSelf: 'right',
              alignItems: 'center',
              justifyContent: 'left',
              marginTop: 8,
              marginBottom: 4
            }}>

              <b style={{ color: '#fafafa', fontSize: 12,marginRight:4 }}>Director: </b>

              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
                props.onGenreClick(file.director);
              }}>{file.director}</a>

              <b style={{ color: '#fafafa', fontSize: 12,marginRight:4 }}>Stars: </b>

              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 8 }} onClick={() => {
                props.onGenreClick(file.cast[0]);
              }}>{file.cast[0]}</a>
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 8 }} onClick={() => {
                props.onGenreClick(file.cast[1]);
              }}>{file.cast[1]}</a>
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 8 }} onClick={() => {
                props.onGenreClick(file.cast[2]);
              }}>{file.cast[2]}</a>
              <a style={{ color: '#fafafa', fontSize: 12, margin: 4, marginRight: 16 }} onClick={() => {
                props.onGenreClick(file.cast[3]);
              }}>{file.cast[3]}</a>

            </div>
          </div>
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
