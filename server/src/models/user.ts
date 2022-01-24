const bcrypt = require("bcrypt");
import IUserAttributes from '../../../common/models/user';

export default class User {
  attributes: IUserAttributes;
  mongoModel: any;
  
  constructor(attributes: IUserAttributes) {
    if(attributes.password && attributes.password.length < 6) 
      throw Error("Password should be at least 6 characters long.")
    
    this.attributes = {
      ...attributes, 
      password: this.hashPassword(attributes.password!)
    };
  }
  
  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
}