import { login_unif } from '../connections/login_unificado'
import { DataTypes, Model, Optional } from 'sequelize'
import { UserType } from '../Schemas/UserSchema';

interface UserAttributes extends UserType {
  id: string;
  username: string;
  password: string;
  state: boolean;
  password2?: string;
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
  declare state: boolean;
  declare company: number;
  declare process: number;
  declare rol: string;
  declare resetPasswordToken: string;
  declare resetPasswordExpires: Date;
}

User.init({
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  names: { type: DataTypes.STRING, allowNull: false, },
  lastNames: { type: DataTypes.STRING, allowNull: false, },
  document: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  phone: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false, },
  password2: { type: DataTypes.STRING, allowNull: true, },
  state: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
  company: { type: DataTypes.INTEGER, allowNull: false, },
  process: { type: DataTypes.INTEGER, allowNull: false, },
  rol: { type: DataTypes.STRING, allowNull: false, },
  resetPasswordToken: { type: DataTypes.STRING, allowNull: true, },
  resetPasswordExpires: { type: DataTypes.DATE, allowNull: true, },
}, {
  sequelize: login_unif,
  modelName: 'Login_User',
})

export { User }