// EntityList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalReducer } from '../hooks/useGlobalReducer';
import { addToFavorites } from './Actions';
import '../assets/css/EntityList.css';

const EntityList = ({ entities, entityType, onFavorite }) => {
  const { dispatch } = useGlobalReducer();

  const renderEntities = (filteredEntities, derivedEntityType) => {
    return (
      <div className="slider-container">
        <div className="slider">
          {filteredEntities.map(entity => {
            let imageEntityType = derivedEntityType;
            if (entityType === 'favorites') {
              imageEntityType = entity.url.includes('people') ? 'characters' : imageEntityType;
              imageEntityType = entity.url.includes('planets') ? 'planets' : imageEntityType;
              imageEntityType = entity.url.includes('vehicles') ? 'vehicles' : imageEntityType;
            }

            return (
              <div className="card" key={entity.uid}>
                <img
                  className="card-img-top"
                  src={`https://starwars-visualguide.com/assets/img/${imageEntityType}/${entity.uid}.jpg`}
                  alt={entity.name}
                  style={{ width: '100%', height: '195px' }}
                />
                <div className="card-body">
                  <div className="card-header">
                    <div className="title">
                      <p className="card-title">{entity.name}</p>
                    </div>
                    <div className="heart">
                      <button
                        id="favorite"
                        onClick={() =>
                          onFavorite ? onFavorite(entity) : dispatch(addToFavorites(entity))
                        }
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
                <div className="Details">
                  
                    <button className="anchor">
                      <Link to={`./details/${derivedEntityType}/${entity.uid}`}>Learn more!</Link>
                    </button>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const characters = entities.filter(entity => entity.url.includes('people'));
  const vehicles = entities.filter(entity => entity.url.includes('vehicles'));
  const planets = entities.filter(entity => entity.url.includes('planets'));

  return (
    <div className="entity-list">
      <h2>Characters</h2>
      {renderEntities(characters, 'characters')}

      <h2>Vehicles</h2>
      {renderEntities(vehicles, 'vehicles')}

      <h2>Planets</h2>
      {renderEntities(planets, 'planets')}
    </div>
  );
};

export default EntityList;



