import React, { useState } from 'react';
import { Intro } from './components/Intro';
import { Gallery } from './components/Gallery';

const App = () => {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      {!hasEntered ? (
        <Intro onEnter={() => setHasEntered(true)} />
      ) : (
        <div className="animate-fade-in">
          <Gallery 
            initialCollection="lost_missions" 
            onReturnHome={() => setHasEntered(false)}
          />
        </div>
      )}
    </>
  );
};

export default App;