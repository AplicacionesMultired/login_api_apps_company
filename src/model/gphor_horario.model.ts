import { marcacion } from '../connections/marcacion';
import { DataTypes, Model, Optional } from "sequelize";

interface GphorHorarioAttributes {
  id: number;
  IdGrupoHorario: number;
  IdHorario: number;
  diaSeman: string;
}

interface GphorHorarioCreationAttributes extends Optional<GphorHorarioAttributes, "id"> { }

export class GphorHorario extends Model<GphorHorarioAttributes, GphorHorarioCreationAttributes> implements GphorHorarioAttributes {
  public id!: number;
  public IdGrupoHorario!: number;
  public IdHorario!: number;
  public diaSeman!: string;
}

GphorHorario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    IdGrupoHorario: { type: DataTypes.INTEGER, allowNull: false },
    IdHorario: { type: DataTypes.INTEGER, allowNull: false },
    diaSeman: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "grupohorario_horario",
    sequelize: marcacion,
    timestamps: false,
  }
);

