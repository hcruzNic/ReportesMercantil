import { Component, OnInit } from '@angular/core';
import { left } from '@popperjs/core';
import { SharedDataService } from "src/app/services/shared-data.service";
import { ICountByEstado } from "src/app/Interfaces/ICountByEstado";

@Component({
  selector: 'app-pie-mercantil',
  templateUrl: './pie-mercantil.component.html',
  styleUrls: ['./pie-mercantil.component.css']
})
export class PieMercantilComponent implements OnInit {

   constructor( private sharedDataService:SharedDataService) { }

    data: any = {};
    options: any; 

  ngOnInit(): void {
    
    this.sharedDataService.getCountByEstado$().subscribe((countByEstado:ICountByEstado) => {
      this.updateChartData([countByEstado]);
      this.loadDefaultChartData();
    });

    //this.loadDefaultChartData();
  }

  loadDefaultChartData():void{
    const countByEstado = this.sharedDataService.getCountByEstado();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const dataValues = ['Activa', 'Disuelta', 'Disuelta y Liquidada', 'Inactiva', 'No definido', 'Cancelada'].map((estado) => countByEstado[estado] || 0);

    this.data = {
                  labels: ['Activa', 'Disuelta', 'Disuelta y Liquidada','Inactiva','No definido',"Cancelada"],
                  datasets: [
                      {
                          data: dataValues,
                          backgroundColor: [
                                              documentStyle.getPropertyValue('--blue-500'), 
                                              documentStyle.getPropertyValue('--yellow-500'), 
                                              documentStyle.getPropertyValue('--red-500'),
                                              documentStyle.getPropertyValue('--gray-500'), 
                                              documentStyle.getPropertyValue('--purple-500'),
                                              documentStyle.getPropertyValue('--orange-500')],                                              
                          hoverBackgroundColor: [
                                                  documentStyle.getPropertyValue('--blue-300'), 
                                                  documentStyle.getPropertyValue('--yellow-400'), 
                                                  documentStyle.getPropertyValue('--red-400'),
                                                  documentStyle.getPropertyValue('--gray-400'), 
                                                  documentStyle.getPropertyValue('--purple-400'),
                                                  documentStyle.getPropertyValue('--orange-500')]
                      }
                  ]
    };

    this.options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor,
                  position:left,
                  display:false
              }
          }
      }
    }; 
  }

  updatePieChart(countByEstado: { [estado: string]: number }): void {
    try {
      
      const labels = Object.keys(countByEstado);
      const dataValues = labels.map((estado) => countByEstado[estado]);
    
      // Actualiza los datos del gráfico
      this.data.labels = labels;
      if (this.data.datasets) {
        this.data.datasets[0].data = dataValues;
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  updateChartData(data: any[]): void {
   
    this.updatePieChart(data[0]);
  }
}