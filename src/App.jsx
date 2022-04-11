import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Eudaimonia from './game/Eudaimonia';

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index path="*" element={<Eudaimonia />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
