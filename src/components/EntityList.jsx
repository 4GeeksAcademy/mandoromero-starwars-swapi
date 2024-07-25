// EntityCarousel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useGlobalReducer } from '../hooks/useGlobalReducer';
import { addToFavorites, removeFromFavorites } from './Actions';

const EntityCarousel = ({ entities, entityType, onFavorite }) => {
  const { dispatch } = useGlobalReducer();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {entities.map(entity => {
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
            <div key={entity.uid} style={{ padding: '10px' }}>
              <div
                className="card"
                style={{
                  cursor: "grab",
                  width: "225px",
                  height: "303px",
                  marginBottom: "10px",
                  border: "3px #FFE81F solid",
                  color: "#FFE81F",
                  backgroundColor: "#000000"
                }}
              >
                <img
                  className="card-img-top"
                  src={`https://starwars-visualguide.com/assets/img/${imageEntityType}/${entity.uid}.jpg`}
                  alt={entity.name}
                  style={{ width: "100%", height: "180px" }}
                />
                <div className="card-body" style={{ paddingBottom: "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="card-title" style={{ margin: "0", fontSize: "16px" }}>{entity.name}</p>
                    <button
                      id="favorite"
                      style={{
                        border: "none",
                        backgroundColor: "#000000",
                        color: "#FFE81F",
                        cursor: "pointer"
                      }}
                      onClick={() => onFavorite ? onFavorite(entity) : dispatch(addToFavorites(entity))}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
                <Link
                  to={`/details/${derivedEntityType}/${entity.uid}`}
                  className="btn"
                  style={{
                    width: "100%",
                    height: "30px",
                    fontSize: "12px",
                    marginTop: "10px",
                    backgroundColor: "#FFE81F",
                    textAlign: "center"
                  }}
                >
                  Learn more!
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default EntityCarousel;