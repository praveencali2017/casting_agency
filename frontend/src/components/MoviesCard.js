import React, { useEffect, useState } from 'react';
import { dateFormatter } from '../utils/helpers';
import {ajaxRequest, MOVIES_API, fetchMovies } from '../utils/service';


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
                  data-toggle="modal" data-target={"#updateMovieModal_"+movie.id} style={{cursor:"pointer"}}>Update</div>
                </div>
              </div>
              {createMovieUpdateModal(movie)}
            </div>
  };



  const createMovieUpdateModal = function(movie){
    const releaseDate = dateFormatter(movie.release_date);
    return <div className="modal fade" id={"updateMovieModal_"+movie.id} role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id={"updateMovieModalTitle_"+movie.id}>Update Movie</h5>
          <button type="button" className="close" data-dismiss="modal" id={"updateMovieModalDismiss_"+movie.id}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <label className="input-group" for={"updateMovieTitleText_"+movie.id}>Title:</label>
            <input type="text" className="form-control" id={"updateMovieTitleText_"+movie.id} defaultValue={movie.title}/>  
          </div>
          <div className="input-group">
            <label className="input-group" for={"updateMovieReleaseDateVal_"+movie.id}>Release Date:</label>
            <input type="date" className="form-control" id={"updateMovieReleaseDateVal_"+movie.id} defaultValue={releaseDate}/>                      
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" style={{marginLeft:"auto", marginRight:"auto"}} className="btn btn-primary" onClick={_=>{updateMovie(movie.id)}}>Update</button>
        </div>
      </div>   
</div>
</div>
  }

  const updateMovie = function(movieId){
    // Let's close the modal while updating values
    document.getElementById("updateMovieModalDismiss_"+movieId).click();
    const title = document.getElementById('updateMovieTitleText_'+movieId).value;
    const releaseDate = document.getElementById('updateMovieReleaseDateVal_'+movieId).value;
    ajaxRequest(MOVIES_API+'/'+movieId, 'PATCH', {
      'title': title,
      'release_date': releaseDate
    }, (resData)=>{
      if(resData.success && resData.data){
        const otherMovies = movies.filter(movie=> movie.id != movieId);
        setMovies([...otherMovies, resData.data]);  
      }
    });
  }

  return (
    <div className='row'>
       {movies.map(createMovieCards)}
    </div>

  );
}
export default MoviesCard;