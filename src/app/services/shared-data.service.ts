import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ICountByEstado } from "src/app/Interfaces/ICountByEstado";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private hasDataSubject = new BehaviorSubject<boolean>(false);
  hasData$ = this.hasDataSubject.asObservable();

  setHasData(hasData: boolean): void {
    this.hasDataSubject.next(hasData);
  }

  private countByEstado: { [estado: string]: number } = {};
  private countByEstado$ = new BehaviorSubject<ICountByEstado>(
    {
      Activa: 0,
      Disuelta: 0,
      'Disuelta y Liquidada': 0,
      Inactiva: 0,
      'No definido': 0,
      Cancelada: 0
    }
  );

  setCountByEstado(data: { [estado: string]: number }): void {
    this.countByEstado = data;
    this.countByEstado$.next({
      Activa: data['Activa'] || 0,
      Disuelta: data['Disuelta'] || 0,
      'Disuelta y Liquidada': data['Disuelta y Liquidada'] || 0,
      Inactiva: data['Inactiva'] || 0,
      'No definido': data['No definido'] || 0,
      Cancelada: data['Cancelada'] || 0
    });
  }

  getCountByEstado(): { [estado: string]: number } {
    return this.countByEstado;
  }

  getCountByEstado$(): Observable<ICountByEstado> {
    return this.countByEstado$.asObservable();
  }

  /* A partir de acá inician los metodos para el grófico de anillo*/
  
  private countByTipoSociedad: { [tipoSociedad: string]: number } = {};
  private countByTipoSociedad$ = new BehaviorSubject<{ [tipoSociedad: string]: number }>({});

  setCountByTipoSociedad(data: { [tipoSociedad: string]: number }): void {
    this.countByTipoSociedad = data;
    this.countByTipoSociedad$.next(data);
  }

  getCountByTipoSociedad(): { [tipoSociedad: string]: number } {
    return this.countByTipoSociedad;
  }

  getCountByTipoSociedad$(): Observable<{ [tipoSociedad: string]: number }> {
    return this.countByTipoSociedad$.asObservable();
  }

  /* A partir de acá inician los metodos para el grófico de pastel Departamentos*/
  private countByDepartamento:{[departamento:string]:number} = {};
  private countByDepartamento$ = new BehaviorSubject<{[departamento:string]:number}>({});

  setCountByDepartamento(data:{[departamento:string]:number}):void{
    this.countByDepartamento = data;
    this.countByDepartamento$.next(data);
  }

  getCountByDepartamento():{[departamento:string]:number}{
    return this.countByDepartamento;
  }

  getCountByDepartamento$():Observable<{[departamento:string]:number}>{
    return this.countByDepartamento$.asObservable();
  }

}
