import { DataTypes, Model, Optional } from 'sequelize';
import { marcacion } from '../connections/marcacion';
import { Persona } from './persona.model';

interface MarcacionAttributes {
  Id: number;
  codigo: string;
  Fecha: Date;
  Hora: Date;
  estado: string;
  dispositivo: string;
}

interface MarcacionCreationAttributes extends Optional<MarcacionAttributes, 'Id'> { }

export class Marcacion extends Model<MarcacionAttributes, MarcacionCreationAttributes> implements MarcacionAttributes {
  public Id!: number;
  public codigo!: string;
  public Fecha!: Date;
  public Hora!: Date;
  public estado!: string;
  public dispositivo!: string;
  public Persona!: Persona;
}

Marcacion.init(
  {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false, },
    Fecha: { type: DataTypes.DATE, allowNull: false, },
    Hora: { type: DataTypes.TIME, allowNull: false, },
    estado: { type: DataTypes.STRING, allowNull: false, },
    dispositivo: { type: DataTypes.STRING, allowNull: false, },
  },
  {
    tableName: 'registrostiempos',
    sequelize: marcacion,
    timestamps: false
  }
);

Marcacion.belongsTo(Persona, {  foreignKey: 'codigo',  targetKey: 'identificacion'});