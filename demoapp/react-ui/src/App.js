import React from 'react';
import Home from './components/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
function App({children}) {
  return (
    <div className="App">
      <Home />
      {children}
    </div>
  );
}

export default App;
