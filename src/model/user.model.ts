import { login_unif } from '../connections/login_unificado'
import { DataTypes, Model, Optional } from 'sequelize'

type UserAttributes = {
  id: string;
  names: string;
  lastNames: string;
  document: number;
  phone: number;
  email: string;
  username: string;
  password: string;
  password2?: string;
  state: number;
  company: number;
  proceso: number;
  rol: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'password2' | 'resetPasswordToken' | 'resetPasswordExpires'>

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare names: string;
  declare lastNames: string;
  declare document: number;
  declare phone: number;
  declare email: string;
  declare username: string;
  declare password: string;
  declare password2: string;
  declare state: number;
  declare company: number;
  declare proceso: number;
  declare rol: string;
  declare resetPasswordToken: string;
  declare resetPasswordExpires: Date;
}

User.init({
  id: { type: DataTypes.STRING, primaryKey: true, allowNull: false, unique: true },
  names: { type: DataTypes.STRING, allowNull: false, },
  lastNames: { type: DataTypes.STRING, allowNull: false, },
  document: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  phone: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false, },
  password2: { type: DataTypes.STRING, allowNull: true, },
  state: { type: DataTypes.INTEGER, allowNull: false, },
  company: { type: DataTypes.INTEGER, allowNull: false, },
  proceso: { type: DataTypes.INTEGER, allowNull: false, },
  rol: { type: DataTypes.STRING, allowNull: false, },
  resetPasswordToken: { type: DataTypes.STRING, allowNull: true, },
  resetPasswordExpires: { type: DataTypes.DATE, allowNull: true, },
}, {
  sequelize: login_unif,
  modelName: 'Login_User',
})

export { User }