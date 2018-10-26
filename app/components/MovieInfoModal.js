import React from 'react';

export default function MovieInfo(props) {
  return   <div style={{alignItems:'center',justifyContent:'center'}} onClick={()=>props.closeModal()} className='blurredOverlay'>
    <div style={{width:300, margin:32}}>
      <img style={{boxShadow: '10px 10px 38px 5px rgba(0,0,0,0.5)',borderRadius:8}} src={props.poster}/>
    </div>
    <div style={{flex:1}}>
      <ul>
        <li className='infoRow'>
          <h6 className='infoTitle'>{props.title}</h6>
        </li>
        <li>
        </li>
        <li className='infoRow'>
          <b className='infoHeader'>Released</b>
          <b className='infoData'>
            {props.released}</b>
        </li>
        <li className='infoRow'>
          <b className='infoHeader'>Genre</b>

          <b className='infoData'>
            {props.genre}
          </b>
        </li>
        <li className='infoRow'>
          <b className='infoHeader'>Director</b>

          <b className='infoData'>
            {props.director}
          </b>
        </li>
        <li className='infoRow'>
          <b className='infoHeader'>Actors</b>

          <b className='infoData'>{props.actors}</b>
        </li>
        <li className='infoRow'>
          <b className='infoHeader'>IMDB</b>

          <b className='infoData'>{props.imdbRating}</b>

          <b className='infoHeader'>Meta</b>

          <b className='infoData'>{props.metascore}</b>
        </li>
        <li className='infoRow'>
          <b className='infoHeader'>Awards</b>
          <b className='infoData'>{props.awards}</b>
        </li>
      </ul>
    </div>

  </div>
}
