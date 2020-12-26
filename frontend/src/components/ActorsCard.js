import React, { useEffect, useState } from 'react';
import { ACTORS_API } from '../utils/service';

function ActorsCard(props) {
    const [actors, setActors] = useState([]);
    // Fetch available actors
    useEffect(_=>{
        loadActors();
      }, []);

      useEffect(_=>{
        if(props.loadActors){
          loadActors();
        }
      },[props.loadActors])
      
      const loadActors = function(){
        fetch(ACTORS_API)
        .then(response => response.json())
        .then(resData=>{
          if(resData && resData.success){
            setActors(resData.data);
          }
        });
      }

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