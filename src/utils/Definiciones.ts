
export function Company(company: number): string {
  const companies: { [key in number]: string } = {
    0: 'MultiredYServired',
    1: 'Multired',
    2: 'Servired'
  };
  return companies[company];
}

export function Procces(procces: number): string {
  const process: { [key in number]: string } = {
    0: 'Cajas',
    1: 'Técnología',
    2: 'Contabilidad',
    3: 'Comercial',
    4: 'Administración',
    5: 'Gestión Humana',
    6: 'Gerencia',
    7: 'Tesoreria',
    8: 'Auditoria',
    9: 'Cumplimiento',
    10: 'Operaciones',
    11: 'Legal',
    12: 'Mercadeo'
  };
  return process[procces];
}

export function State (state: boolean): string {
  return state ? 'Activo' : 'Inactivo';
}
