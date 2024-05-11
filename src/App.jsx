import { Routes, Route } from 'react-router-dom'
import Home from './pages/public/home/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
   </Routes>
  )
}

export default App
