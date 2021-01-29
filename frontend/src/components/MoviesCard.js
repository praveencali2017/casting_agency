import React, { useEffect, useState } from 'react';
import {fetchMovies } from '../utils/service';


function MoviesCard(props) {
  const [movies, setMovies] = useState([]);
  // Fetch available movies
  useEffect(_=>{
    fetchMovies((resData)=>{
      setMovies(resData);
      props.loadMoviesList(resData);
    });
  }, []);

  useEffect(_=>{
    if(props.loadMovies){
      fetchMovies((resData)=>{
        setMovies(resData);
        props.loadMoviesList(resData);
      });
    }
  },[props.loadMovies]);

  const createMovieCards = function(movie){
    return  <div className='col' style={{padding:3, marginLeft:2}}>
              <div className="card" style={{width:300}}>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'black'}}>{movie.title}</h5>
                  <p>Releases on: {new Date(movie.release_date.replace("GMT", "")).toDateString()}</p>
                  <div className="btn-success btn-sm text-center" id={'movie-id-btn-'+movie.id}
                  data-toggle="modal" data-target="#updateMovieModal" style={{cursor:"pointer"}} onClick={_=>props.chooseUpdate(movie)}>Update</div>
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