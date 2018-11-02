import React from 'react';

export default function DragDropView() {
  return  <div className='playList' style={{
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    width:"95%",
    flex: 1,
    borderStyle: 'dashed',
    margin: 32,
    marginTop: 0,
    marginBottom: 86,
    backgroundColor: 'rgba(32,32,32,0.2)'
  }}>
    <text className='unselectable' style={{
      textAlign: 'center',
      fontStyle: 'regular',
      fontSize: 32,
      color: '#cccccc'
    }}>drag your file or folder here
    </text>
  </div>;
};
