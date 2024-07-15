import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Register from './pages/register/Register'
import './App.css'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
