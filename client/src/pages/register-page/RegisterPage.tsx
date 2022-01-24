import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem } from '@ionic/react';
import './RegisterPage.css';
import Header from '../../components/header/Header';
import User from '../../models/user';
import IUserAttributes from '../../../../common/models/user';
import AuthenticationService from '../../services/authentication-service';


const RegisterPage: React.FC = () => {
  const [userRegistrationAttributes, setUserRegistrationAttributes] = useState<IUserAttributes>({})
  const navigate = useHistory();

  async function register(e: any) {
    e.preventDefault();
    console.log(`user attributes: ${JSON.stringify(userRegistrationAttributes)}`)

    try {
      const user = new User(userRegistrationAttributes);
      const authenticationService = new AuthenticationService(user);

      const responseMessage = await authenticationService.register();
      alert(responseMessage);
      navigate.push("/log-in")
    } 
    catch(e: any) {
      alert(e.response.data)
    }
  }

return (
    <IonPage id="register-page">
      <Header />
      <IonContent>
          <h2 className="text-large">Create a New Account</h2>
          <p>Take a moment to create your free account to be able to add reviews.</p>
          <form onSubmit={register} className="form">
            <ul className="flex-col">
              <li className="flex-col register-page__li">
                <label htmlFor="user__full-name" className="text-bold">Full Name</label>
                <input type="text" name="user__full-name" id="register-page__user__full-name" className="input" onChange={(e) => setUserRegistrationAttributes({...userRegistrationAttributes, fullName: e.target.value})} />
              </li>

              <li className="flex-col register-page__li">
                <label htmlFor="user__username" className="text-bold">Username</label>
                <input type="text" name="user__username" id="register-page__user__username" className="input" onChange={(e) => setUserRegistrationAttributes({...userRegistrationAttributes, userName: e.target.value})} />
              </li>

              <li className="flex-col register-page__li">
                <label htmlFor="user__email" className="text-bold">Email</label>
                <input type="email" name="user__email" id="register-page__user__email" className="input" onChange={(e) => setUserRegistrationAttributes({...userRegistrationAttributes, email: e.target.value})} />
              </li>

              <li className="flex-col register-page__li">
                <label htmlFor="user__password" className="text-bold">Password</label>
                <input type="password" name="user__password" id="register-page__user__password" className="input" onChange={(e) => setUserRegistrationAttributes({...userRegistrationAttributes, password: e.target.value})} />
              </li>

              <li className="flex-col register-page__li">
                <input type="submit" name="user__submit" value="Submit" id="register-page__user__submit" className="button button-purple button-small button-input" />
              </li>
            </ul>
          </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
