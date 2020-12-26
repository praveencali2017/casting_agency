import React, { useState } from 'react';
import ActorsCard from './ActorsCard';
import MoviesCard from './MoviesCard';
import { MOVIES_API, ACTORS_API } from '../utils/service';
function Dashboard(props) {
  const [isMovieUpdated, setIsMovieUpdated] = useState(false);
  const [isActorUpdated, setIsActorUpdated] = useState(false);
  
  const addNewMovie = function(){
    let reqData = {
      'title': document.getElementById('movieTitleTxt').value,
      'release_date': document.getElementById('movieReleaseDateVal').value
    };
    fetch(MOVIES_API, {
      method:'POST',
      body: JSON.stringify(reqData),
      headers: new Headers({
        'Content-Type': 'application/json'
      })})
    .then(response => response.json())
    .then(resData=>{
        if(resData && resData.success){
          setIsMovieUpdated(true);
        }
        document.getElementById("dismissMovieModalBtn").click();
    }) 
  };
  const addNewActor = function(){
    let reqData = {
      'name': document.getElementById('actorNameTxt').value,
      'age': document.getElementById('actorAgeTxt').value,
      'gender': document.querySelector('input[name = gender]:checked').value
    };
    fetch(ACTORS_API, {
      method:'POST',
      body: JSON.stringify(reqData),
      headers: new Headers({
        'Content-Type': 'application/json'
      })})
    .then(response => response.json())
    .then(resData=>{
        if(resData && resData.success){
          setIsActorUpdated(true);
        }
        document.getElementById("dismissActorModalBtn").click();
    }) 
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
        {/* Body */}
        <div className='row'>
        <div className='col'>
          <h3>Movies</h3>
          <div className='btn-primary btn-lg' id='createMovieBtn' data-toggle="modal" data-target="#addMovieModal">Create Movie</div>
          {createMovieModal()}
          <div className='container' style={{marginLeft:15, marginTop:10}}>
            <MoviesCard loadMovies={isMovieUpdated}/>
          </div>
        </div>
        <div className='col'>
          <h3>Actors</h3>
          <div className='btn-primary btn-lg' id='createActorBtn' data-toggle="modal" data-target="#addActorModal">Create Actor</div>
          {createActorModal()}
          <div className='container' style={{marginLeft:15, marginTop:10}}>
            <ActorsCard loadActors={isActorUpdated}/>
          </div>
        </div>
        </div>
      </div>
    </div>

  );
}
export default Dashboard;