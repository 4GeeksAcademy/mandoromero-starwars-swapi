// Home.jsx
import React, { useEffect } from 'react';
import EntityList from "../components/EntityList.jsx";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { fetchPeople, fetchVehicles, fetchPlanets } from '../components/Actions.jsx';

const Home = () => {
  const { state, dispatch } = useGlobalReducer();
  
  useEffect(() => {
    dispatch(fetchPeople());
    dispatch(fetchVehicles());
    dispatch(fetchPlanets());
  }, [dispatch]);

  return (
    <div className="container" style={{ fontFamily: 'SF Distant Galaxy, sans-serif', textAlign: "center", backgroundColor: "black", width: "100%", height: "auto" }}>
      <h1 style={{ color: "#ffe81f" }}>Star Wars Entities</h1>
      <h2 style={{ color: "#ffe81f" }}>Characters</h2>
      <EntityList entities={state.characters} entityType="characters" />
      <h2 style={{ color: "#ffe81f" }}>Vehicles</h2>
      <EntityList entities={state.vehicles} entityType="vehicles" />
      <h2 style={{ color: "#ffe81f" }}>Planets</h2>
      <EntityList entities={state.planets} entityType="planets" />
    </div>
  );
};

export default Home;
