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
import CreatePage from "./pages/workshop/CreatePage";
import EditPage from "./pages/workshop/EditPage";
import SearchPage from "./pages/workshop/SearchPage";
import QuizContainer from "./pages/learn/QuizContainer";

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


            <Route path="/quiz/:id" element={<QuizContainer />}/>
            
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/workshop/create" element={<CreatePage />}/>
            <Route path="/workshop/edit/:id" element={<EditPage />}/>
            <Route path="/workshop/search" element={<SearchPage />}/>
          </Routes>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
