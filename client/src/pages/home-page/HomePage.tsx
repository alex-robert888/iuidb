import { IonContent, IonPage, IonGrid, IonRow } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import './HomePage.css';
import Header from '../../components/header/Header';
import { useEffect } from 'react';

const HomePage: React.FC = () => {
  const history = useHistory();
  
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history.push("/designs")
    }
  }, [])

  return (
    <IonPage>
      <Header />
      <IonContent id="home-page__ion-content">
        <IonGrid>
          <IonRow id="home-page-row-1" className="ion-justify-content-center">
            <h1 className="ion-text-center text-xlarge text-bold">International UI Database</h1>
          </IonRow>
          <IonRow id="home-page-row-2" className="ion-justify-content-center">
            <p className="ion-text-center text-medium">Our aim is to create the biggest database of websites ranked by their UI / UX design (totally nothing to do with IMDB).</p>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <div id="home-page__buttons">
              <Link to="/register" className="button button-purple button-large">Register</Link>
              <Link to="/log-in" className="button button-white button-large">Log In</Link>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
