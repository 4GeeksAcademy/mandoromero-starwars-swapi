// EntityCarousel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalReducer } from '../hooks/useGlobalReducer';
import { addToFavorites } from './Actions';
import '../assets/css/EntityList.css';

const EntityCarousel = ({ entities, entityType, onFavorite }) => {
  const { dispatch } = useGlobalReducer();

  // Split entities into chunks of 5 for each carousel item
  const chunkedEntities = [];
  for (let i = 0; i < entities.length; i += 5) {
    chunkedEntities.push(entities.slice(i, i + 5));
  }

  return (
    <div className="carousel-container">
      <Carousel interval={5000} indicators={true} controls={true}>
        {chunkedEntities.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="row">
              {chunk.map(entity => {
                let derivedEntityType = entityType;
                if (!entityType) {
                  if (entity.url.includes('people')) {
                    derivedEntityType = 'characters';
                  } else if (entity.url.includes('planets')) {
                    derivedEntityType = 'planets';
                  } else if (entity.url.includes('vehicles')) {
                    derivedEntityType = 'vehicles';
                  }
                }

                let imageEntityType = derivedEntityType;
                if (entityType === 'favorites') {
                  imageEntityType = entity.url.includes('people') ? 'characters' : imageEntityType;
                  imageEntityType = entity.url.includes('planets') ? 'planets' : imageEntityType;
                  imageEntityType = entity.url.includes('vehicles') ? 'vehicles' : imageEntityType;
                }

                return (
                  <div className="col-md-2" key={entity.uid}>
                    <div className="card">
                      <img
                        className="card-img-top"
                        src={`https://starwars-visualguide.com/assets/img/${imageEntityType}/${entity.uid}.jpg`}
                        alt={entity.name}
                        style={{ width: '100%', height: '150px' }}
                      />
                      <div className="card-body">
                        <div className="card-header">
                          <div className="title">
                            <p className="card-title">{entity.name}</p>
                          </div>
                          <div>  
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
                        <Link to={`./details/${derivedEntityType}/${entity.uid}`}>Learn more!</Link>
                      </div> 
                    </div>  
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default EntityCarousel;
