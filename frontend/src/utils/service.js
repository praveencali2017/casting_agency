import { toast } from "react-toastify";

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
const addMovie = function(reqData, callback, token){
    ajaxRequest(MOVIES_API, 'POST', reqData, callback, token);
  };

const addActor = function(reqData, callback, token){
    ajaxRequest(ACTORS_API, 'POST', reqData, callback, token);
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
    if(token != null){
    fetch(url, {
        method: method,
        body: reqData?JSON.stringify(reqData): null,
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        })})
    .then(response =>response.json())
    .then(resData=>{
        if(!resData.success && resData.auth_error){
            toast.error(resData.description, {position:'bottom-center'});
        }
        if(callback){
            callback(resData);
        }
    })
    .catch(exc=>{
        console.log(exc);
    }); 
}
else{
    console.log("No Authorized token is set!!!!");
}
};

export {SERVER_URL, MOVIES_API, ACTORS_API, MOVIE_CAST_API, fetchMovies, fetchActors, addMovie, addActor, ajaxRequestPost, ajaxRequest, AUTH_DOMAIN};