import { IonPage, IonContent } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import './LogInPage.css';
import IUserAttributes from '../../../../common/models/user';
import User from '../../models/user';
import AuthenticationService from '../../services/authentication-service';


const LogInPage: React.FC = () => {
  const [userLogInAttributes, setUserLogInAttributes] = useState<IUserAttributes>({})
  const navigate = useHistory();

  async function logIn(e: any) {
    e.preventDefault();

    try {
      const user = new User(userLogInAttributes);
      const authenticationService = new AuthenticationService(user);

      const [responseMessage, responseAccessToken] = await authenticationService.logIn();
      alert(responseMessage);
      localStorage.setItem("accessToken", responseAccessToken);
      navigate.push("/designs")
    } 
    catch(e: any) {
      alert(e.response.data)
    }
  }
  
  return (
    <IonPage>
      <Header />
      <IonContent>
          <h2 className="text-large">Welcome back!</h2>
          <p id="log-in-page__p">Enter your credentials to get to your profile.</p>
          <form onSubmit={logIn} className="form">
            <ul className="flex-col">
              <li className="flex-col log-in-page__li">
                <label htmlFor="user__email" className="text-bold">Email</label>
                <input type="email" name="user__email" id="log-in-page__user__email" className="input" onChange={(e) => setUserLogInAttributes({...userLogInAttributes, email: e.target.value})} />
              </li>

              <li className="flex-col log-in-page__li">
                <label htmlFor="user__password" className="text-bold">Password</label>
                <input type="password" name="user__password" id="log-in-page__user__password" className="input" onChange={(e) => setUserLogInAttributes({...userLogInAttributes, password: e.target.value})} />
              </li>

              <li className="flex-col log-in-page__li">
                <input type="submit" name="user__submit" value="Log In" id="log-in-page__user__submit" className="button button-purple button-small button-input" />
              </li>
            </ul>
          </form>
      </IonContent>
    </IonPage>
  );
};

export default LogInPage;
