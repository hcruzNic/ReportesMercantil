import { Component, OnInit,Input } from '@angular/core';
import { SharedDataService } from "src/app/services/shared-data.service";

@Component({
  selector: 'app-kpi-cards',
  templateUrl: './kpi-cards.component.html',
  styleUrls: ['./kpi-cards.component.css']
})
export class KpiCardsComponent implements OnInit {
  @Input()dataSincronizacion: any;

  totalPorDepartamento: any;
  porcentaje: number = 0;
  totalPorDepartamentoValue: string = '';
  showKpiCard!: boolean;
  

  constructor(private sharedDataService:SharedDataService) { }

  labels: string[] = [];
  dataValues:any[] = [];

  ngOnInit(): void {

    this.sharedDataService.getCountByDepartamento$().subscribe((countByDepartamento) => {
            this.updateKpiDepartamento(countByDepartamento);
    });

    this.sharedDataService.showKpiCard$.subscribe((showKpiCard) => {
      this.showKpiCard = showKpiCard;
    });
   
  }

  updateKpiDepartamento(countByDepartamento:{[departamento:string]:number}):void{
    try {      
      this.totalPorDepartamento = countByDepartamento;
      const values = Object.values(countByDepartamento);      
      const totalCount: number = values.reduce((acc, value) => acc + value, 0);      
      this.porcentaje = parseFloat(((totalCount / totalCount) * 100).toFixed(2));    

      const departamento = Object.keys(this.totalPorDepartamento)[0];
      const total = this.totalPorDepartamento[departamento];

      if (total !== undefined && this.totalPorDepartamento !== undefined) {
            this.totalPorDepartamentoValue = `${departamento}: ${total.toLocaleString()}`;
      } else {
            this.totalPorDepartamentoValue = '';
      }
      
    } catch (error) {
      console.error(error);
    }
  } 
}