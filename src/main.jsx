import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'



const Main = () => {
  console.log('Main component rendering');
  return (
    <React.StrictMode>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </React.StrictMode>
  );
};

console.log('Rendering root');

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

