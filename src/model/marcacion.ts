import { DataTypes, Model, Optional } from 'sequelize';
import { marcacion } from '../connections/marcacion';

// +---------------------+--------------+------+-----+---------+----------------+
// | Field               | Type         | Null | Key | Default | Extra          |
// +---------------------+--------------+------+-----+---------+----------------+
// | id                  | int unsigned | NO   | PRI | NULL    | auto_increment |
// | id_empleado         | int          | YES  |     | NULL    |                |
// | fecha_marcacion     | datetime     | YES  |     | NULL    |                |
// | estado_marcacion    | varchar(255) | YES  |     | NULL    |                |
// | nombre_dispositivo  | varchar(255) | YES  |     | NULL    |                |
// | observacion         | varchar(500) | YES  |     | NULL    |                |
// | observacionPersonal | varchar(500) | YES  |     | NULL    |                |
// | id_turno            | int          | YES  |     | NULL    |                |
// | Pais                | varchar(20)  | YES  |     | NULL    |                |
// | Ciudad              | varchar(20)  | YES  |     | NULL    |                |
// | Direccion           | longtext     | YES  |     | NULL    |                |
// | Latitud             | longtext     | YES  |     | NULL    |                |
// | Longitud            | longtext     | YES  |     | NULL    |                |
// | id_foto_temota      | varchar(200) | YES  |     | NULL    |                |
// +---------------------+--------------+------+-----+---------+----------------+

export interface MarcacionAttributes {
  id?: number;
  id_empleado?: number;
  fecha_marcacion?: Date;
  estado_marcacion?: string;
  nombre_dispositivo?: string;
  observacion?: string;
  observacionPersonal?: string;
  id_turno?: number;
  Pais?: string;
  Ciudad?: string;
  Direccion?: string;
  Latitud?: string;
  Longitud?: string;
  id_foto_temota?: string;
}

export interface MarcacionCreationAttributes extends Optional<MarcacionAttributes, 'id'> { }

export class Marcacion extends Model<MarcacionAttributes, MarcacionCreationAttributes> implements MarcacionAttributes {
  public id!: number;
  public id_empleado!: number;
  public fecha_marcacion!: Date;
  public estado_marcacion!: string;
  public nombre_dispositivo!: string;
  public observacion!: string;
  public observacionPersonal!: string;
  public id_turno!: number;
  public Pais!: string;
  public Ciudad!: string;
  public Direccion!: string;
  public Latitud!: string;
  public Longitud!: string;
  public id_foto_temota!: string;
}

Marcacion.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    id_empleado: { type: DataTypes.INTEGER, allowNull: true, },
    fecha_marcacion: { type: DataTypes.DATE, allowNull: true, },
    estado_marcacion: { type: DataTypes.STRING, allowNull: true, },
    nombre_dispositivo: { type: DataTypes.STRING, allowNull: true, },
    observacion: { type: DataTypes.STRING, allowNull: true, },
    observacionPersonal: { type: DataTypes.STRING, allowNull: true, },
    id_turno: { type: DataTypes.INTEGER, allowNull: true, },
    Pais: { type: DataTypes.STRING, allowNull: true, },
    Ciudad: { type: DataTypes.STRING, allowNull: true, },
    Direccion: { type: DataTypes.TEXT, allowNull: true, },
    Latitud: { type: DataTypes.TEXT, allowNull: true, },
    Longitud: { type: DataTypes.TEXT, allowNull: true, },
    id_foto_temota: { type: DataTypes.STRING, allowNull: true, },
  },
  {
    tableName: 'marcacion',
    sequelize: marcacion,
    timestamps: false,
  }
);