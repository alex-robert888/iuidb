const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import User from '../models/user';
import MongoUser from '../database/models/mongo-user';


export default class AuthenticationService {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  async register() {
    const mongoUser = new MongoUser(this.user.attributes);
    await mongoUser.save();
  }

  async login(): Promise<string> {
    const mongoModelByEmail = await MongoUser.findOne({ email: this.user.attributes.email }).orFail();
    await bcrypt.compare(this.user.attributes.password, mongoModelByEmail.password);
    this.user.attributes.id = mongoModelByEmail._id;

    const accessToken = jwt.sign(this.user.attributes, process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
  }
}