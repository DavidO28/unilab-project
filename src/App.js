import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import RegistrationPage from './components/RegistratonPage/RegistrationPage';
import FormPage from './components/FormPage/FormPage';
import ApiPage from './components/ApiPage/ApiPage'
function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/unilab-project" element={<LandingPage />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
          <Route path="/FormPage" element={<FormPage />} />
          <Route path="/ApiPage" element={<ApiPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
