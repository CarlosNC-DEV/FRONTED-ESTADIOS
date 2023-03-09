import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Historial from './layouts/Historial';
import Estadios from './layouts/Estadios';
import Equipos from './layouts/Equipos';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Historial></Historial>}></Route>
        <Route path='/estadios' element={<Estadios></Estadios>}></Route>
        <Route path='/equipos' element={<Equipos></Equipos>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
