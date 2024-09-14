import { Model, DataTypes, Optional } from 'sequelize';
import { marcacion } from '../connections/marcacion';

// id	int(10) unsigned	NO	PRI	(null)	auto_increment
// nombre	varchar(255)	NO		(null)	
// nit	varchar(50)	YES		(null)	
// direccion	varchar(2000)	YES		(null)	
// contacto	varchar(255)	YES		(null)	
// email	varchar(50)	YES		(null)	
// telefono	varchar(255)	YES		(null)	
// ext	varchar(255)	YES		(null)	
// ciudad	varchar(200)	YES		(null)	
// observacion	longtext	YES		(null)	

interface EmpresaAttributes {
  id: number;
  nombre: string;
  nit: string;
  direccion: string;
  contacto: string;
  email: string;
  telefono: string;
  ext: string;
  ciudad: string;
  observacion: string;
}

interface EmpresaCreationAttributes extends Optional<EmpresaAttributes, 'id'> { }

class Empresa extends Model<EmpresaAttributes, EmpresaCreationAttributes> implements EmpresaAttributes {
  public id!: number;
  public nombre!: string;
  public nit!: string;
  public direccion!: string;
  public contacto!: string;
  public email!: string;
  public telefono!: string;
  public ext!: string;
  public ciudad!: string;
  public observacion!: string;
}

Empresa.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(255), allowNull: false },
  nit: { type: DataTypes.STRING(50), allowNull: true },
  direccion: { type: DataTypes.STRING(2000), allowNull: true },
  contacto: { type: DataTypes.STRING(255), allowNull: true },
  email: { type: DataTypes.STRING(50), allowNull: true },
  telefono: { type: DataTypes.STRING(255), allowNull: true },
  ext: { type: DataTypes.STRING(255), allowNull: true },
  ciudad: { type: DataTypes.STRING(200), allowNull: true },
  observacion: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'empresa',
  sequelize: marcacion,
  timestamps: false
});

export { Empresa };