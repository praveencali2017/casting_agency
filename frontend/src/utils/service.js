const SERVER_URL = `${window.location.origin}/`;
const MOVIES_API = SERVER_URL+'v1/movies';
const ACTORS_API = SERVER_URL+'v1/actors';
const MOVIE_CAST_API = SERVER_URL+'v1/movies_cast';
const AUTH_DOMAIN = "dev-prav-auth.us.auth0.com";

const fetchMovies = function(callback, token){
    ajaxRequest(MOVIES_API, 'GET', null, (resData)=>{
        if(resData && resData.success){
            callback(resData.data);
        }
    }, token);
  };
const fetchActors = function(callback, token){
    ajaxRequest(ACTORS_API, 'GET', null, (resData)=>{
        if(resData && resData.success){
            callback(resData.data);
        }
    }, token);
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
    })
    .catch(exc=>{
        alert(exc);
    })
  };

const ajaxRequest = function(url, method, reqData, callback, token){
    fetch(url, {
        method: method,
        body: reqData?JSON.stringify(reqData): null,
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        })})
    .then(response => response.json())
    .then(resData=>{
        if(callback){
            callback(resData);
        }
    })
    .catch(exc=>{
        alert(exc);
    }); 
};

const ajaxRequestGet = function(url, callback){
    fetch(url)
    .then(response => response.json())
    .then(resData=>{
        callback(resData);
    });
  };

export {SERVER_URL, MOVIES_API, ACTORS_API, MOVIE_CAST_API, fetchMovies, fetchActors, addMovie, addActor, ajaxRequestGet, ajaxRequestPost, ajaxRequest, AUTH_DOMAIN};