import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/public/home/Home'
import { EventInfo } from './pages/public/eventInfo/EventInfo'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/event/:id' element={<EventInfo />} />
   </Routes>
  )
}

export default App
