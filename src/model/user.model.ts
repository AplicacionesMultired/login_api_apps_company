import { login_unif } from '../connections/login_unificado'
import { DataTypes, Model, Optional } from 'sequelize'
import { UserType } from '../Schemas/UserSchema';

interface UserAttributes extends UserType {
  id: string;
  username: string;
  password: string;
  state: boolean;
  password2?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
} 

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'password2' | 'resetPasswordToken' | 'resetPasswordExpires'>

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: string;
  public names!: string;
  public lastNames!: string;
  public document!: number;
  public phone!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public state!: boolean;
  public password2!: string | null;
  public resetPasswordToken!: string | null;
  public resetPasswordExpires!: Date | null;
  public company!: number;
  public process!: number;
  public sub_process!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  process: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0, max: 12 } },
  sub_process: { type: DataTypes.STRING, allowNull: false, validate: { min: 0, max: 30 } },
  resetPasswordToken: { type: DataTypes.STRING, allowNull: true, },
  resetPasswordExpires: { type: DataTypes.DATE, allowNull: true, },
}, {
  sequelize: login_unif,
  modelName: 'login_users',
})

export { User }