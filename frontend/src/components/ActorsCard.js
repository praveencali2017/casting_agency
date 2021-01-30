import React, { useEffect, useState } from 'react';
import {ACTORS_API, fetchActors, ajaxRequest } from '../utils/service';

function ActorsCard(props) {
    const [actors, setActors] = useState([]);
    // Fetch available actors
    useEffect(_=>{
        loadActors()
      }, []);

    useEffect(_=>{
    if(props.loadActors){
        loadActors();
    }
    },[props.loadActors]);

    const loadActors = function(){
        fetchActors((resData)=>{
            setActors(resData);
            props.loadActorsList(resData);
        });
    }

    const deleteActor = function(actor){
        const choice = window.confirm(`Are you sure you want to delete the actor ${actor.name} ?`);
        if(!choice){
          return;
        }
        ajaxRequest(ACTORS_API+'/'+actor.id, 'DELETE', null, (resData)=>{
          if(resData.success){
            // Need to load associations. Hence we need to trigger an update
            props.isActorDeleted();
            loadActors();
          }
        })
      }

    const createActorCards = function(actor){
      return  <div className='col' style={{padding:3, marginLeft:2}}>
                <div className="card" style={{width:300}}>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'black'}}>{actor.name}</h5>
                  <p style={{color:'black'}}>Age: {actor.age}</p>
                  <p style={{color:'black'}}>Gender: {actor.gender}</p>
                  <div className='row'>
                    <div className='col'>
                        <div className="btn-success btn-sm text-center" id={'actorUpdateBtnContainer'+actor.id}
                        data-toggle="modal" data-target="#updateActorModal" style={{cursor:"pointer"}} onClick={_=>props.chooseUpdate(actor)}>Update</div>
                    </div>
                    <div className='col'>
                      <div className="btn-danger btn-sm text-center" id={'deleteActor_'+actor.id} style={{cursor:"pointer"}} onClick={_=> deleteActor(actor)}>Delete</div>
                    </div>
                  </div>
                  
                </div>
              </div>
      </div>
    };  
  
    return (
      <div className='row'>
         {actors.map(createActorCards)}
      </div>
  
    );
  }
  export default ActorsCard;