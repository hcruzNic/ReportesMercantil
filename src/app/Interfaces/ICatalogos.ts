
export interface IDepartamento{
    IdDepartamento: number;
    Departamento: string;
}

export interface IMunicipio{
    IdMunicipio: number;
    Municipio: string;
    IdDepartamento: number;
    Departamento: string;
}

export interface ISincronizacionActiva{
    CantidadSociedades: number;
    ConDeclaracionBF:number;
    ConDeclaracionVigente:number;
    FechaEjecucion:number;
    FechaEjecucion_Date: Date;
    IdSincronizacion: number;
}