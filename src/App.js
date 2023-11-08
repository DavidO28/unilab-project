import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import RegistrationPage from './components/RegistratonPage/RegistrationPage';
import FormPage from './components/FormPage/FormPage';
import ApiPage from './components/ApiPage/ApiPage'
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
          <Route path="/FormPage" element={<FormPage />} />
          <Route path="/ApiPage" element={<ApiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
