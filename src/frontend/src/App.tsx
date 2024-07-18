import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import './App.css'

import Header from './components/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient();

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/test" element={<Header />}/>
          </Routes>
        </QueryClientProvider>
      </Router>
    </>
  )
}

export default App
