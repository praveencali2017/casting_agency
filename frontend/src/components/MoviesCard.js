import React, { useEffect, useState } from 'react';
import {ajaxRequest, fetchMovies, MOVIES_API } from '../utils/service';


function MoviesCard(props) {
  const [movies, setMovies] = useState([]);
  // Fetch available movies
  useEffect(_=>{
    loadMovies();
  }, []);

  useEffect(_=>{
    if(props.loadMovies){
      loadMovies();
    }
  },[props.loadMovies]);

  const loadMovies = function(){
    fetchMovies((resData)=>{
      setMovies(resData);
      props.loadMoviesList(resData);
    });
  }
  const deleteMovie = function(movie){

    const choice = window.confirm(`Are you sure you want to delete the movie ${movie.title} ?`);
    if(!choice){
      return;
    }
    ajaxRequest(MOVIES_API+'/'+movie.id, 'DELETE', null, (resData)=>{
      if(resData.success){
        // Need to load associations. Hence we need to trigger an update
        props.isMovieDeleted();
        loadMovies();
      }
    })
  }

  const createMovieCards = function(movie){
    return  <div className='col' style={{padding:3, marginLeft:2}}>
              <div className="card bg-light mb-3" style={{width:300}}>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'black'}}>{movie.title}</h5>
                  <p>Releases on: {new Date(movie.release_date.replace("GMT", "")).toDateString()}</p>
                  <div className='row'>
                    <div className='col'>
                      <div className="btn-success btn-sm text-center" id={'movie-id-btn-'+movie.id}
                      data-toggle="modal" data-target="#updateMovieModal" style={{cursor:"pointer"}} onClick={_=>props.chooseUpdate(movie)}>Update</div>
                    </div>
                    <div className='col'>
                      <div className="btn-danger btn-sm text-center" id={'deleteMovie_'+movie.id} style={{cursor:"pointer"}} onClick={_=> deleteMovie(movie)}>Delete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  };

  return (
    <div className='row'>
       {movies.map(createMovieCards)}
    </div>

  );
}
export default MoviesCard;