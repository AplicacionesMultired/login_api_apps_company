// +-------------------------------+--------------+------+-----+---------+----------------+
// | Field                         | Type         | Null | Key | Default | Extra          |
// +-------------------------------+--------------+------+-----+---------+----------------+
// | id                            | int unsigned | NO   | PRI | NULL    | auto_increment |
// | codigo                        | varchar(255) | YES  |     | NULL    |                |
// | descripcion                   | varchar(255) | YES  |     | NULL    |                |
// | hora_inicio                   | varchar(255) | YES  |     | NULL    |                |
// | hora_fin                      | varchar(255) | YES  |     | NULL    |                |
// | teorico                       | varchar(255) | YES  |     | NULL    |                |
// | tolerancia_despues_entrada    | varchar(255) | YES  |     | NULL    |                |
// | tolerancia_antes_salir        | varchar(255) | YES  |     | NULL    |                |
// | tiempo_breack                 | varchar(255) | YES  |     | NULL    |                |
// | conceptos                     | varchar(255) | YES  |     | NULL    |                |
// +-------------------------------+--------------+------+-----+---------+----------------+

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

export class Turno extends Model<TurnoAttributes, TurnoCreationAttributes> implements TurnoAttributes {
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

Turno.init(
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
