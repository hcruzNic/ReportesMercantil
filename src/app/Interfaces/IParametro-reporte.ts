export interface IParametroReporte {
    frecuencia: IParametro<number>;
    ubicacion: IParametroUbicacion;
    fechas: IParametroFecha;
    pagina: number;
}

export interface IParametro<TValue> {
    value: TValue;
}
  
export interface IParametroUbicacion {
    departamento: number;
    municipio: number;
}
  
export interface IParametroFecha {
    fecha_1: number;
    fecha_2: number;
}