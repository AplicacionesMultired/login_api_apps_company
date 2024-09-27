import { Marcacion } from '../model/marcacion.model';
import { MainError } from '../types/error.mysql';
import { Estado } from '../enums/Estados';

/**
 * Función para validar si un Error de type unknow pertenece a Interface MainError. 
 *
 * @param error - Recibe como parametro un error .
 * @returns Retorna un valor booleano. el cual indica si el error es de tipo MainError.
 */
function isMainError(error: unknown): error is MainError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'parent' in error &&
    typeof (error as MainError).parent.code === 'string'
  );
}

function reduceStates (marcacion: Marcacion[]) {

  const estadosMap: { [key: string]: Estado } = {
    'Entrada': Estado.Entrada,
    'Salida_intermedia': Estado.SalidaIntermedia,
    'Entrada_intermedia': Estado.EntradaIntermedia,
    'Salida': Estado.Salida
  };

  return marcacion.reduce((acc, mar) => {
    const key = estadosMap[mar.estado];
    if (key) { acc[key] += 1; }
    return acc
  }, { 
    [Estado.Entrada]: 0,
    [Estado.SalidaIntermedia]: 0,
    [Estado.EntradaIntermedia]: 0,
    [Estado.Salida]: 0
  })
}

export { isMainError, reduceStates };