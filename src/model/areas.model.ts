// +-------------+--------------+------+-----+---------+----------------+
// | Field       | Type         | Null | Key | Default | Extra          |
// +-------------+--------------+------+-----+---------+----------------+
// | id          | int unsigned | NO   | PRI | NULL    | auto_increment |
// | codigo      | varchar(255) | YES  |     | NULL    |                |
// | descripcion | varchar(255) | YES  |     | NULL    |                |
// +-------------+--------------+------+-----+---------+----------------+

import { Model, DataTypes, Optional } from 'sequelize'
import { marcacion } from '../connections/marcacion'

interface AreaAttributes {
  id: number;
  codigo: string;
  descripcion: string;
}

interface AreaCreationAttributes extends Optional<AreaAttributes, "id"> { }

class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  public id!: number;
  public codigo!: string;
  public descripcion!: string;
}

Area.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  codigo: { type: DataTypes.STRING(10), allowNull: false },
  descripcion: { type: DataTypes.STRING(50), allowNull: false }
}, {
  tableName: 'areas',
  sequelize: marcacion,
  timestamps: false
})

export { Area };
