import IUserAttributes from '../../../common/models/user';

class User {
  attributes: IUserAttributes;

  constructor(attributes: IUserAttributes) {
    this.attributes = attributes;
  }
}

export default User;