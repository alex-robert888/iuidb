import User from "../models/user";
import axios from 'axios';


const REGISTER_URL = "http://localhost:5000/auth/register"
const LOGIN_URL = "http://localhost:5000/auth/login"

class AuthenticationService {
  user: User;
  
  constructor(user: User) {
    this.user = user;
  }

  async register(): Promise<string> {
    const requestBody = this.user.attributes;
    const response = await axios.post(REGISTER_URL, requestBody);
    const message = response.data.message;
    return message;
  }

  async logIn(): Promise<[string, string]> {
    const requestBody = { 
      email: this.user.attributes.email,
      password: this.user.attributes.password 
    }
    const response = await axios.post(LOGIN_URL, requestBody);
    const message = response.data.message;
    const accessToken = response.data.accessToken;
    return [message, accessToken];
  }
}

export default AuthenticationService;