type Empresa = 0 | 1 | 2;
type Procceso = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; 

export function Company(company: Empresa): string {
  const companies: { [key in 0 | 1 | 2]: string } = {
    0: 'Multired y Servired',
    1: 'Multired',
    2: 'Servired'
  };
  return companies[company];
}

export function Procces(procces: Procceso): string {
  const process: { [key in Procceso]: string } = {
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
