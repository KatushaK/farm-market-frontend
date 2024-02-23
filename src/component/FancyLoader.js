import React from 'react';
import { RotatingLines } from 'react-loader-spinner';


const FancyLoader = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
      <RotatingLines
        type="RotatingLines"
        height={80}
        width={80} 
        strokeWidth="5"
      />
      <p>Loading...</p>
    </div>
  );
};

export default FancyLoader;