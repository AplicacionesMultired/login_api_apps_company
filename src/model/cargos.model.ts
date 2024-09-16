// +-------------+--------------+------+-----+---------+----------------+
// | Field       | Type         | Null | Key | Default | Extra          |
// +-------------+--------------+------+-----+---------+----------------+
// | ID          | int          | NO   | PRI | NULL    | auto_increment |
// | codigo      | varchar(200) | YES  |     | NULL    |                |
// | descripcion | varchar(200) | YES  |     | NULL    |                |
// +-------------+--------------+------+-----+---------+----------------+

import { DataTypes, Model, Optional } from "sequelize";
import { marcacion } from '../connections/marcacion';

interface CargoAttributes {
  ID: number;
  codigo: string;
  descripcion: string;
}

interface CargoCreationAttributes extends Optional<CargoAttributes, "ID"> { }

export class Cargo extends Model<CargoAttributes, CargoCreationAttributes> implements CargoAttributes {
  public ID!: number;
  public codigo!: string;
  public descripcion!: string;
}

Cargo.init(
  {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    codigo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "cargos",
    sequelize: marcacion,
    timestamps: false,
  }
);