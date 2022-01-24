import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="center">
        <h1>International UI Database</h1>
        <p>Our aim is to create the biggest database of websites ranked by their UI / UX design (totally nothing to do with IMDB)</p>
        <div>
          <Link to='/register'>Register</Link>
          <Link to='/log-in'>Log In</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
