// +-------------+--------------+------+-----+---------+----------------+
// | Field       | Type         | Null | Key | Default | Extra          |
// +-------------+--------------+------+-----+---------+----------------+
// | id          | int unsigned | NO   | PRI | NULL    | auto_increment |
// | codigo      | varchar(255) | YES  |     | NULL    |                |
// | descripcion | varchar(255) | YES  |     | NULL    |                |
// +-------------+--------------+------+-----+---------+----------------+

import { DataTypes, Model, Optional } from "sequelize";
import { marcacion } from '../connections/marcacion';

interface GrupoHorarioAttributes {
  id: number;
  codigo: string;
  descripcion: string;
}

interface GrupoHorarioCreationAttributes extends Optional<GrupoHorarioAttributes, "id"> { }

export class GrupoHorario extends Model<GrupoHorarioAttributes, GrupoHorarioCreationAttributes> implements GrupoHorarioAttributes {
  public id!: number;
  public codigo!: string;
  public descripcion!: string;
}

GrupoHorario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "grupohorario",
    sequelize: marcacion,
    timestamps: false,
  }
);