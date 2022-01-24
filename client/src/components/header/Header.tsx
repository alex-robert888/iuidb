import { IonHeader, IonToolbar, IonRow, IonGrid } from '@ionic/react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonRow>
          <img src={logo} alt="logo" />
          <nav id="header__nav">
            <ul className="ul flex-row">
              <li><Link to="/register" className="button button-purple button-small">Register</Link></li>
              <li><Link to="/log-in" className="button button-white button-small">Log In</Link></li>
            </ul>

            <ul className="ul flex-row">
              <li><Link to="/" className="link">Home</Link></li>
              <li><Link to="/" className="link">About Us</Link></li>
              <li><Link to="/" className="link">Contact</Link></li>
              <li><Link to="/" className="link">Top 100</Link></li>
            </ul>
          </nav>
        </IonRow>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
