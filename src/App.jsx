import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Historial from './layouts/Historial';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Historial></Historial>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
