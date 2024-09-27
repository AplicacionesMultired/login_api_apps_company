interface Estados {
  [Estado.Entrada]: number;
  [Estado.SalidaIntermedia]: number;
  [Estado.EntradaIntermedia]: number;
  [Estado.Salida]: number;
}

export enum Estado {
  Entrada = 'Entrada',
  SalidaIntermedia = 'Salida_intermedia',
  EntradaIntermedia = 'Entrada_intermedia',
  Salida = 'Salida'
}
