import { Model, DataTypes, Optional } from 'sequelize';
import { marcacion } from '../connections/marcacion';
import { GrupoTurnoVsHorario } from './GrupoTurnoVsHorario';

interface PersonaAttributes {
  id: number;
  tipoIdentificacion: string;
  identificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  direccion: string;
  ciudad: string;
  tipoPersona: string;
  rH: string;
  telefono: string;
  observaciones: string;
  cod_nomina: string;
  id_Dependencias: number;
  id_Empresa: number;
  estado: string;
  id_Grupo_Horario: number;
  id_Areas: number;
  id_Ciudad: number;
  id_Centro_Costos: number;
  id_Cargo: number;
}

interface PersonaCreationAttributes extends Optional<PersonaAttributes, 'id'> { }

class Persona extends Model<PersonaAttributes, PersonaCreationAttributes> implements PersonaAttributes {
  public id!: number;
  public tipoIdentificacion!: string;
  public identificacion!: string;
  public nombres!: string;
  public apellidos!: string;
  public email!: string;
  public direccion!: string;
  public ciudad!: string;
  public tipoPersona!: string;
  public rH!: string;
  public telefono!: string;
  public observaciones!: string;
  public cod_nomina!: string;
  public id_Dependencias!: number;
  public id_Empresa!: number;
  public estado!: string;
  public id_Grupo_Horario!: number;
  public id_Areas!: number;
  public id_Ciudad!: number;
  public id_Centro_Costos!: number;
  public id_Cargo!: number;
}

Persona.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, },
  tipoIdentificacion: { type: DataTypes.STRING(50), allowNull: false, },
  identificacion: { type: DataTypes.STRING(50), allowNull: false, },
  nombres: { type: DataTypes.STRING(50), allowNull: false, },
  apellidos: { type: DataTypes.STRING(50), allowNull: false, },
  email: { type: DataTypes.STRING(50), allowNull: false, },
  direccion: { type: DataTypes.STRING(50), allowNull: false, },
  ciudad: { type: DataTypes.STRING(50), allowNull: false, },
  tipoPersona: { type: DataTypes.STRING(50), allowNull: false, },
  rH: { type: DataTypes.STRING(50), allowNull: false, },
  telefono: { type: DataTypes.STRING(50), allowNull: false, },
  observaciones: { type: DataTypes.STRING(50), allowNull: false, },
  cod_nomina: { type: DataTypes.STRING(50), allowNull: false, },
  id_Dependencias: { type: DataTypes.INTEGER, allowNull: false, },
  id_Empresa: { type: DataTypes.INTEGER, allowNull: false, },
  estado: { type: DataTypes.STRING(50), allowNull: false, },
  id_Grupo_Horario: { type: DataTypes.INTEGER, allowNull: false, },
  id_Areas: { type: DataTypes.INTEGER, allowNull: false, },
  id_Ciudad: { type: DataTypes.INTEGER, allowNull: false, },
  id_Centro_Costos: { type: DataTypes.INTEGER, allowNull: false, },
  id_Cargo: { type: DataTypes.INTEGER, allowNull: false, },
}, {
  tableName: 'persona',
  sequelize: marcacion,
  timestamps: false,
});

export { Persona };

Persona.hasMany(GrupoTurnoVsHorario, { foreignKey: 'IdGrupoHorario', sourceKey: 'id_Grupo_Horario' });