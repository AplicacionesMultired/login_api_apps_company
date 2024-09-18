import { DataTypes, Model, Optional } from "sequelize";
import { marcacion } from '../connections/marcacion';

interface TurnoAttributes {
  id: number;
  codigo: string;
  descripcion: string;
  hora_inicio: string;
  hora_fin: string;
  teorico: string;
  tolerancia_despues_entrada: string;
  tolerancia_antes_salir: string;
  tiempo_breack: string;
  conceptos: string;
}

interface TurnoCreationAttributes extends Optional<TurnoAttributes, "id"> { }

export class Turnos extends Model<TurnoAttributes, TurnoCreationAttributes> implements TurnoAttributes {
  public id!: number;
  public codigo!: string;
  public descripcion!: string;
  public hora_inicio!: string;
  public hora_fin!: string;
  public teorico!: string;
  public tolerancia_despues_entrada!: string;
  public tolerancia_antes_salir!: string;
  public tiempo_breack!: string;
  public conceptos!: string;
}

Turnos.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    hora_inicio: { type: DataTypes.STRING, allowNull: false },
    hora_fin: { type: DataTypes.STRING, allowNull: false },
    teorico: { type: DataTypes.STRING, allowNull: false },
    tolerancia_despues_entrada: { type: DataTypes.STRING, allowNull: false },
    tolerancia_antes_salir: { type: DataTypes.STRING, allowNull: false },
    tiempo_breack: { type: DataTypes.STRING, allowNull: false },
    conceptos: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "turnotiempos",
    sequelize: marcacion,
    timestamps: false,
  }
);
