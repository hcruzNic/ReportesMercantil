import { Component, OnInit } from '@angular/core';
import { MercantilReportService } from "src/app/services/mercantil-report.service";
import { ISincronizacionActiva } from "src/app/Interfaces/ICatalogos";


@Component({
  selector: 'app-sociedades-inscritas',
  templateUrl: './sociedades-inscritas.component.html',
  styleUrls: ['./sociedades-inscritas.component.css']
})
export class SociedadesInscritasComponent implements OnInit {  
  
  codigoInternoTipoSinc:string = 'SincMercantil'
  public miData : ISincronizacionActiva = {
    CantidadSociedades: 0,
    ConDeclaracionBF:0,
    ConDeclaracionVigente:0,
    FechaEjecucion:0,
    FechaEjecucion_Date: new Date,
    IdSincronizacion: 0
  };
  constructor(private mercantilReportService:MercantilReportService) {}
  
  ngOnInit(){      
      this.mercantilReportService.ObtenerSincronizacionActiva(this.codigoInternoTipoSinc).subscribe((data:any)=>{
          this.miData = data;
          console.log(this.miData);
      });
  } 
  
}