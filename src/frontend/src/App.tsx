import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Error404 from "./pages/Error404";
import Profile from "./pages/profile/Profile";
import Workshop from "./pages/workshop/Workshop";
import Learn from "./pages/learn/Learn";
import "./index.css"

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/quiz/:id" />
            
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/workshop/create" />
            <Route path="/workshop/search" />
          </Routes>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
