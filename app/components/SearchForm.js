import React from 'react';

export default function SearchForm(props) {
  return <div className="cntr">
    <div className="cntr-innr">
      <label className="search" htmlFor="inpt_search">
        <input id="inpt_search" placeholder="Movie, Genre, Cast ... " type="text" onInput={props.onInput}/>
      </label>
    </div>
  </div>
}
