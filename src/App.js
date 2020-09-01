import React from 'react';
import Dropdown from './Dropdown/Dropdown';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mt-3">
          <Dropdown
            onSelectCallback={(v) => {
              console.log('from parent --> ', v);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
