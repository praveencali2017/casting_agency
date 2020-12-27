import React, { useEffect, useState } from 'react';
import {fetchActors } from '../utils/service';

function ActorsCard(props) {
    const [actors, setActors] = useState([]);
    // Fetch available actors
    useEffect(_=>{
        fetchActors((resData)=>{
            setActors(resData);
            props.loadActorsList(resData);
        });
      }, []);

    useEffect(_=>{
    if(props.loadActors){
        fetchActors((resData)=>{
            setActors(resData);
            props.loadActorsList(resData);
        });
    }
    },[props.loadActors]);

    const createActorCards = function(actor){
      return  <div className='col' style={{padding:3, marginLeft:2}}>
                <div className="card" style={{width:300}}>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'black'}}>{actor.name}</h5>
                  <p style={{color:'black'}}>Age: {actor.age}</p>
                  <p style={{color:'black'}}>Gender: {actor.gender}</p>
                  <div className="btn-success btn-sm text-center" id={'actor-id-btn-'+actor.id}>Update</div>
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