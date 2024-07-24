import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalReducer } from '../hooks/useGlobalReducer';
import { addToFavorites, removeFromFavorites } from './Actions';

const EntityCard = ({ entity, entityType, onFavorite }) => {
  // Determine the type for the favorites entity
  let imageEntityType = entityType;
  if (entityType === 'favorites') {
    imageEntityType = entity.url.includes('people') ? 'characters' : imageEntityType;
    imageEntityType = entity.url.includes('planets') ? 'planets' : imageEntityType;
    imageEntityType = entity.url.includes('vehicles') ? 'vehicles' : imageEntityType;
  }

  return (
    <div style={{ backgroundColor: "#000000", width: "100%", margin: "0" }}>
      <div className="card mx-2"
        style={{ width: "225px", height: "303px", marginBottom: "10px", display: "flex", border: "3px #FFE81F solid", color: "#FFE81F", backgroundColor: "#000000" }}
      >
        <img
          className="card-img-top"
          src={`https://starwars-visualguide.com/assets/img/${imageEntityType}/${entity.uid}.jpg`}
          alt={entity.name}
          width="75"
          height="180"
        />
        <div className="card-body" style={{ height: "5px", paddingBottom: "0", marginBottom: "0" }}>
          <div style={{ display: "flex", marginBottom: "0" }}>
            <div style={{ width: "85%" }}>
              <p className="card-title" style={{ marginBottom: "0" }}>{entity.name}</p>
            </div>
            <button
              id="favorite"
              style={{ border: "none", marginLeft: "5px", marginRight: "0", backgroundColor: "#000000", color: "#FFE81F" }}
              onClick={() => onFavorite(entity)} 
            >
              ❤️
            </button>
          </div>
        </div>
        <Link to={`/details/${entityType}/${entity.uid}`} className="btn" style={{ width: "125px", height: "30px", fontSize: "12px", marginTop: "10px", marginRight: "auto", marginLeft: "auto", marginBottom: "10px", backgroundColor: "#FFE81F" }}>Learn more!</Link>
      </div>
    </div>
  );
};

const EntityList = ({ entities, entityType, onFavorite }) => {
  const { dispatch } = useGlobalReducer();

  return (
    <div className="card-deck d-flex col-10 overflow-auto mb-5 mx-auto">
      {entities.map(entity => {
        let derivedEntityType = entityType;
        if (typeof entityType === 'undefined') {
          if (entity.url.includes('people')) {
            derivedEntityType = 'characters';
          } else if (entity.url.includes('planets')) {
            derivedEntityType = 'planets';
          } else if (entity.url.includes('vehicles')) {
            derivedEntityType = 'vehicles';
          }
        }
        return (
          <EntityCard
            key={entity.uid}
            entityType={derivedEntityType}
            entity={entity}
            onFavorite={onFavorite ? onFavorite : (entity) => dispatch(addToFavorites(entity))}
          />
        );
      })}
    </div>
  );
};

export default EntityList;




