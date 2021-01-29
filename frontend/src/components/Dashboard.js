import React, { useState } from 'react';
import ActorsCard from './ActorsCard';
import MoviesCard from './MoviesCard';
import { dateFormatter } from '../utils/helpers';
import {addActor, addMovie, ajaxRequestPost, MOVIE_CAST_API, ACTORS_API, ajaxRequest, MOVIES_API} from '../utils/service';
import MoviesCastCard from './MoviesCastCard';
function Dashboard(props) {
  const [isMovieUpdated, setIsMovieUpdated] = useState(false);
  const [isActorUpdated, setIsActorUpdated] = useState(false);
  const [isMovieActorUpdated, setMovieActorUpdated] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [actorsList, setActorsList] = useState([]);
  const [selectedActorUpdate, setSelectedActorUpdate] = useState({});
  const [selectedMovieUpdate, setSelectedMovieUpdate] = useState({});
  
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

  const updateActorInput = function(){
    const id = selectedActorUpdate.id;
    const gender = document.querySelector("input[name='updateActorGender']:checked").value;
    const name = document.getElementById("updateActorTitleText").value;
    const age = document.getElementById("updateActorAgeVal").value;
    setSelectedActorUpdate({id, gender, name, age});

  }
  const updateMovieInput = function(){
    const id = selectedMovieUpdate.id;
    const title = document.getElementById("updateMovieTitleText").value;
    const release_date = document.getElementById("updateMovieReleaseDateVal").value;
    setSelectedMovieUpdate({id, title, release_date});

  }

  const createActorUpdateModal = function(){
    return <div className="modal fade" id="updateActorModal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="updateActorModalTitle">Update Actor</h5>
          <button type="button" className="close" data-dismiss="modal" id="updateActorModalDismiss">
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <label className="input-group" for="updateActorTitleText">Name:</label>
            <input type="text" className="form-control" id="updateActorTitleText" value={selectedActorUpdate.name} onChange={updateActorInput}/>  
          </div>
          <div className="input-group">
            <label className="input-group" for="updateActorAgeVal">Age:</label>
            <input type="text" className="form-control" id="updateActorAgeVal" value={selectedActorUpdate.age} onChange={updateActorInput}/>                      
          </div>
          <div className="input-group">
            <div className="form-check-inline">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="updateActorGender" value="male" checked={selectedActorUpdate.gender==='male' && 'checked'} onChange={updateActorInput}/>Male
                </label>
              </div>
              <div class="form-check-inline">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="updateActorGender" value="female" checked={selectedActorUpdate.gender==='female' && 'checked'} onChange={updateActorInput}/>Female
                </label>
              </div>                   
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" style={{marginLeft:"auto", marginRight:"auto"}} className="btn btn-primary" onClick={_=>{updateActor(selectedActorUpdate.id)}}>Update</button>
        </div>
      </div>   
</div>
</div>
  }

  const updateActor = function(actorId){
        document.getElementById("updateActorModalDismiss").click();
        const reqData = selectedActorUpdate;
        ajaxRequest(ACTORS_API+'/'+actorId, 'PATCH', reqData, (resData)=>{
            if(resData.success){
                setIsActorUpdated(true);
            }
        });
    }

    const createMovieUpdateModal = function(){
      let releaseDate = selectedMovieUpdate.release_date ? dateFormatter(selectedMovieUpdate.release_date): "";
      return <div className="modal fade" id="updateMovieModal" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Movie</h5>
            <button type="button" className="close" data-dismiss="modal" id="updateMovieModalDismiss">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="input-group">
              <label className="input-group" for="updateMovieTitleText">Title:</label>
              <input type="text" className="form-control" id="updateMovieTitleText" value={selectedMovieUpdate.title} onChange={updateMovieInput}/>  
            </div>
            <div className="input-group">
              <label className="input-group" for="updateMovieReleaseDateVal">Release Date:</label>
              <input type="date" className="form-control" id="updateMovieReleaseDateVal" value={releaseDate} onChange={updateMovieInput}/>                      
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" style={{marginLeft:"auto", marginRight:"auto"}} className="btn btn-primary" onClick={_=>{updateMovie(selectedMovieUpdate.id)}}>Update</button>
          </div>
        </div>   
  </div>
  </div>
    }

    const updateMovie = function(movieId){
      // Let's close the modal while updating values
      document.getElementById("updateMovieModalDismiss").click();
      ajaxRequest(MOVIES_API+'/'+movieId, 'PATCH', selectedMovieUpdate, (resData)=>{
        if(resData.success){
          setIsMovieUpdated(true);
        }
      });
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
                      }} chooseUpdate={setSelectedMovieUpdate}/>
                  </div>
                  {createMovieUpdateModal()}
                </div>
                <div className='col'>
                  <h3>Actors</h3>
                  <div className='btn-primary btn-lg' id='createActorBtn' data-toggle="modal" data-target="#addActorModal">Create Actor</div>
                    {createActorModal()}
                  <div className='container' style={{marginLeft:15, marginTop:10}}>
                    <ActorsCard loadActors={isActorUpdated} loadActorsList={(resData)=>{
                      setActorsList(resData);
                      setIsActorUpdated(false);
                      }} chooseUpdate={setSelectedActorUpdate} />
                  </div>
                  {createActorUpdateModal()}
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