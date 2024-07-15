import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import './App.css'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
