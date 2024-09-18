import { marcacion } from '../connections/marcacion';
import { DataTypes, Model, Optional } from 'sequelize';
import { GrupoHorario } from './grupohorario.model';
import { Turno } from './turnos.model';

interface GrupoTurnoVsHorarioAttributes {
  id: number;
  IdGrupoHorario: number;
  IdHorario: number;
  diaSeman: string;
}

interface GrupoTurnoVsHorarioCreationAttributes extends Optional<GrupoTurnoVsHorarioAttributes, 'id'> { }

export class GrupoTurnoVsHorario extends Model<GrupoTurnoVsHorarioAttributes, GrupoTurnoVsHorarioCreationAttributes> implements GrupoTurnoVsHorarioAttributes {
  public id!: number;
  public IdGrupoHorario!: number;
  public IdHorario!: number;
  public diaSeman!: string;
}

GrupoTurnoVsHorario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    IdGrupoHorario: { type: DataTypes.INTEGER, allowNull: false },
    IdHorario: { type: DataTypes.INTEGER, allowNull: false },
    diaSeman: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'grupohorario_horario',
    sequelize: marcacion,
    timestamps: false,
  }
);

GrupoTurnoVsHorario.belongsTo(GrupoHorario, { foreignKey: 'IdGrupoHorario', targetKey: 'id'})
GrupoTurnoVsHorario.belongsTo(Turno, { foreignKey: 'IdHorario', targetKey: 'id'})