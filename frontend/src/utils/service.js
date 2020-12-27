const SERVER_URL = `${window.location.origin}/`;
const MOVIES_API = SERVER_URL+'v1/movies';
const ACTORS_API = SERVER_URL+'v1/actors';
const MOVIE_CAST_API = SERVER_URL+'v1/movies_cast';

const fetchMovies = function(callback){
    fetch(MOVIES_API)
    .then(response => response.json())
    .then(resData=>{
        if(resData && resData.success){
            callback(resData.data);
        }
    }); 
  };
const fetchActors = function(callback){
    fetch(ACTORS_API)
    .then(response => response.json())
    .then(resData=>{
        if(resData && resData.success){
            callback(resData.data);
        }
    });
};
const addMovie = function(reqData, callback){
    fetch(MOVIES_API, {
      method:'POST',
      body: JSON.stringify(reqData),
      headers: new Headers({
        'Content-Type': 'application/json'
      })})
    .then(response => response.json())
    .then(resData=>{
        callback(resData);
    }) 
  };

const addActor = function(reqData, callback){
    fetch(ACTORS_API, {
        method:'POST',
        body: JSON.stringify(reqData),
        headers: new Headers({
        'Content-Type': 'application/json'
        })})
    .then(response => response.json())
    .then(resData=>{
        callback(resData);
    }) 
  };

const ajaxRequestPost = function(url, reqData, callback){
    fetch(url, {
        method:'POST',
        body: JSON.stringify(reqData),
        headers: new Headers({
        'Content-Type': 'application/json'
        })})
    .then(response => response.json())
    .then(resData=>{
        callback(resData);
    }); 
  };

const ajaxRequestGet = function(url, callback){
    fetch(url)
    .then(response => response.json())
    .then(resData=>{
        callback(resData);
    });
  };

export {SERVER_URL, MOVIES_API, ACTORS_API, MOVIE_CAST_API, fetchMovies, fetchActors, addMovie, addActor, ajaxRequestGet, ajaxRequestPost};