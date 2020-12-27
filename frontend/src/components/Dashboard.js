import React, { useState } from 'react';
import ActorsCard from './ActorsCard';
import MoviesCard from './MoviesCard';
import {addActor, addMovie, ajaxRequestPost, MOVIE_CAST_API} from '../utils/service';
import MoviesCastCard from './MoviesCastCard';
function Dashboard(props) {
  const [isMovieUpdated, setIsMovieUpdated] = useState(false);
  const [isActorUpdated, setIsActorUpdated] = useState(false);
  const [isMovieActorUpdated, setMovieActorUpdated] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [actorsList, setActorsList] = useState([]);
  
  const addNewMovie = function(){
    let reqData = {
      'title': document.getElementById('movieTitleTxt').value,
      'release_date': document.getElementById('movieReleaseDateVal').value
    };
    addMovie(reqData, (resData)=>{
      if(resData && resData.success){
        setIsMovieUpdated(true);
      }
      document.getElementById("dismissMovieModalBtn").click();
    });
  };

  const addNewActor = function(){
    let reqData = {
      'name': document.getElementById('actorNameTxt').value,
      'age': document.getElementById('actorAgeTxt').value,
      'gender': document.querySelector('input[name = gender]:checked').value
    };
    addActor(reqData, (resData)=>{
      if(resData && resData.success){
        setIsActorUpdated(true);
      }
      document.getElementById("dismissActorModalBtn").click();
    });
  };

  const addActorToMovie = function(){
    ajaxRequestPost(MOVIE_CAST_API, {
      'movie_id': document.getElementById('selectedMovie').value,
      'actor_id': document.getElementById('selectedActor').value
    }, (resData)=>{
      if(resData.success){
        setMovieActorUpdated(true);
      }
    });
  }


  const createMovieModal = function(){
    return <div className="modal fade" id="addMovieModal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addMovieModalTitle">Add New Movie</h5>
                  <button type="button" className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <label className="input-group" for="movieTitleTxt">Title:</label>
                    <input type="text" className="form-control" id="movieTitleTxt"/>  
                  </div>
                  <div className="input-group">
                    <label className="input-group" for="movieReleaseDateVal">Release Date:</label>
                    <input type="date" className="form-control" id="movieReleaseDateVal"/>                      
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={_=>{addNewMovie();}}>Add</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" id="dismissMovieModalBtn">Close</button>
                </div>
              </div>   
        </div>
    </div>
  }

  const createActorModal = function(){
    return <div className="modal fade" id="addActorModal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addActorModalTitle">Add Actor</h5>
                  <button type="button" className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <label className="input-group" for="actorNameTxt">Name:</label>
                    <input type="text" className="form-control" id="actorNameTxt"/>  
                  </div>
                  <div className="input-group">
                    <label className="input-group" for="actorAgeTxt">Age:</label>
                    <input type="text" className="form-control" id="actorAgeTxt"/>  
                  </div>
                  <div className="form-check-inline">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="gender" value="male"/>Male
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label className="form-check-label">
                      <input type="radio" className="form-check-input" name="gender" value="female"/>Female
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={_=>{addNewActor();}}>Add</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" id="dismissActorModalBtn">Close</button>
                </div>
              </div>   
        </div>
    </div>
  }
  return (
    <div className='row'>
      <div className='col'>
          <div className="nav nav-tabs" id="dashboardTab" role="tablist">
              <a className="nav-item nav-link active" data-toggle="tab" href="#viewContent" role="tab">View/Edit</a>
              <a className="nav-item nav-link" data-toggle="tab" href="#manageCastContent" role="tab">Manage Cast</a>
          </div>
          <div className="tab-content" id="tabDashboardContent">
            <div className="tab-pane fade show active" id="viewContent" role="tabpanel" >
              <div className="row">
                <div className='col'>
                  <h3>Movies</h3>
                  <div className='btn-primary btn-lg' id='createMovieBtn' data-toggle="modal" data-target="#addMovieModal">Create Movie</div>
                    {createMovieModal()}
                  <div className='container' style={{marginLeft:15, marginTop:10}}>
                    <MoviesCard loadMovies={isMovieUpdated} loadMoviesList={(resData)=>{
                      setMoviesList(resData);
                      setIsMovieUpdated(false);
                      }}/>
                  </div>
                </div>
                <div className='col'>
                  <h3>Actors</h3>
                  <div className='btn-primary btn-lg' id='createActorBtn' data-toggle="modal" data-target="#addActorModal">Create Actor</div>
                    {createActorModal()}
                  <div className='container' style={{marginLeft:15, marginTop:10}}>
                    <ActorsCard loadActors={isActorUpdated} loadActorsList={(resData)=>{
                      setActorsList(resData);
                      setIsActorUpdated(false);
                      }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="manageCastContent" role="tabpanel">
              <div className="row">
                <div className="col">
                  <div className="row" style={{marginTop:20}}>
                    <div className="col">
                      <select className="custom-select" id="selectedMovie">
                        <option disabled selected>Select Movie</option>
                        {moviesList.map((movie)=>{
                          return <option value={movie.id}>{movie.title}</option>
                        })}
                      </select>
                    </div>
                    <div className="col">
                      <select className="custom-select" id="selectedActor">
                        <option disabled selected>Select Actor</option>
                        {actorsList.map((actor)=>{
                          return <option value={actor.id}>{actor.name}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:10}}>
                    <div className="col">
                      <div className="btn btn-success btn-lg btn-block" onClick={addActorToMovie}>
                        Cast to the movie
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <MoviesCastCard isUpdated={isMovieActorUpdated} disableIsUpdated={()=> setMovieActorUpdated(false)}/>
                    </div>
                  </div>    
                </div>
                
              </div>
            </div>
          </div>
      </div>
    </div>

  );
}
export default Dashboard;