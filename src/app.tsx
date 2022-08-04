import Overview from "./pages/overview";
import { Routes, Route } from "react-router-dom";
import Project from "./pages/project";
import Git from "./pages/git";
import Nav from "./components/nav";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/project" element={<Project />} />
        <Route path="/git" element={<Git />} />
      </Routes>
      <Footer />
    </div>
  );
}
