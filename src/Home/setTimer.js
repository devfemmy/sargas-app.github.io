import React, { useEffect } from 'react';

const SetTimer = (props) => {
  
  useEffect(() => {
    
    
        const timer = setTimeout(() => {
            props.runTimer();
        }, 10000);
        return () => clearTimeout(timer);


  });

  return (
    <div>
    </div>
  );
};

export default SetTimer;