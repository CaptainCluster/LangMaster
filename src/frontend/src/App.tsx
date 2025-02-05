import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Error404 from "./pages/Error404";
import Profile from "./pages/profile/Profile";
import Workshop from "./pages/workshop/Workshop";
import Learn from "./pages/learn/Learn";
import CreatePage from "./pages/workshop/CreatePage";
import EditPage from "./pages/workshop/EditPage";
import QuizContainer from "./pages/learn/QuizContainer";
import ListQuizzes from "./components/learn/ListQuiz";

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
            <Route path="/workshop/search" element={<ListQuizzes redirectInit="/workshop/edit/"/>}/>
          </Routes>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
