import React, { useEffect, useState } from 'react';
import {MOVIE_CAST_API, ajaxRequestGet } from '../utils/service';

function MoviesCastCard(props) {
  const [moviesCast, setMoviesCast] = useState([]);
  // Fetch available movies
  useEffect(_=>{
        fetchMoviesCrew();
    },[]);
  
  useEffect(_=>{
    if(props.isUpdated){
        fetchMoviesCrew();
    }
  }, [props.isUpdated]);

  const fetchMoviesCrew = function(){
    ajaxRequestGet(MOVIE_CAST_API, (resData)=>{
        if(resData.success){
            setMoviesCast(resData.data);
            props.disableIsUpdated();
        }
    });
  }

  const createMovieCastsCards = function(movieCast){
    return  <div className='col' style={{padding:3, marginLeft:2}}>
              <div className="card" style={{width:300}}>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'black'}}>{movieCast.movie.title +"'s Actors"}</h5>
                  <p>Movie Title: {movieCast.movie.title}</p>
                  <label>Actors:</label>
                  {movieCast.actors.map((actor)=>{
                      return <span class="badge badge-pill badge-primary">{actor.name}</span>
                  })}
                </div>
              </div>
            </div>
  };

  return (
    <div className='row'>
       {moviesCast.map(createMovieCastsCards)}
    </div>

  );
}
export default MoviesCastCard;