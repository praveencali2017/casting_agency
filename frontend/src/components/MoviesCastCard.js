import React, { useEffect, useState } from 'react';
import {MOVIE_CAST_API, ajaxRequest } from '../utils/service';

function MoviesCastCard(props) {
  const [moviesCast, setMoviesCast] = useState([]);
  const [showCastContent, setCastShowContent] = useState(false);
  // Fetch available movies
  useEffect(_=>{
        fetchMoviesCrew();
    },[]);

    useEffect(_=>{
        fetchMoviesCrew();
    },[props.appToken]);
  
  useEffect(_=>{
    if(props.isUpdated){
        fetchMoviesCrew();
    }
  }, [props.isUpdated]);

  const fetchMoviesCrew = function(){
    ajaxRequest(MOVIE_CAST_API,'GET', null, (resData)=>{
        if(resData.success){
            props.updateShowContent(true);
            setMoviesCast(resData.data);
            props.disableIsUpdated();
        }else{
            props.updateShowContent(false);
        }
    }, props.appToken);
  }


  const deleteCast = function(movie, actor){
    const choice = window.confirm(`This action will remove ${actor.name} from the movie ${movie.title} ?`);
    if(!choice){
      return;
    }
    ajaxRequest(MOVIE_CAST_API+`?actor_id=${actor.id}&movie_id=${movie.id}`, 'DELETE', null, (resData)=>{
      if(resData.success){
        fetchMoviesCrew();
      }
    }, props.appToken);
  }

  const createMovieCastsCards = function(movieCast){
    return  <div className='col' style={{padding:3, marginLeft:2}}>
              <div className="card" style={{width:300}}>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'black'}}>{movieCast.movie.title +"'s Actors"}</h5>
                  <p>Movie Title: {movieCast.movie.title}</p>
                  <label>Actors:</label>
                  {movieCast.actors.map((actor)=>{
                      return <button class="btn btn-primary btn-sm" style={{margin:2}}>
                      {actor.name} <span class="badge badge-light" onClick={_=>deleteCast(movieCast.movie, actor)}>&times;</span>
                    </button>
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