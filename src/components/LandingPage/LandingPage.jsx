import './LandingPage.css'
import { Link } from 'react-router-dom';
import MainImg from '../../assets/images/LandingPage/landingPageImg.png';

function LandingPage() {
  return (
    <div className='landingPage'>
        <img className='mainImg' src={MainImg} alt="logo" />
        <h1 className='headline'>Get Started Today</h1>
        <Link to="/RegistrationPage">
          <button className='registrationBtn'>Get Started</button>
        </Link>
    </div>
  );
}

export default LandingPage;
