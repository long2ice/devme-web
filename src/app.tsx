import Overview from "./pages/overview";
import { Routes, Route } from "react-router-dom";
import Project from "./pages/project";
import Git from "./pages/git";
import Nav from "./components/nav";
import Footer from "./components/footer";
import NotFound from "./components/404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
      <Nav />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/project" element={<Project />} />
        <Route path="/git" element={<Git />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
