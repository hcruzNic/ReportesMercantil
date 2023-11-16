import { Component, OnInit } from '@angular/core';
import { left } from '@popperjs/core';
import { Chart } from 'chart.js';
import { SharedDataService } from "src/app/services/shared-data.service";

@Component({
  selector: 'app-pie-actividad',
  templateUrl: './pie-actividad.component.html',
  styleUrls: ['./pie-actividad.component.css']
})
export class PieActividadComponent implements OnInit {

  constructor(private sharedDataService:SharedDataService) { }

  data: any = {};
  options: any; 

  ngOnInit(): void {

    this.sharedDataService.getCountByActividadComercial$().subscribe((countByActividad) => {
      this.updateChartData([countByActividad]);
      this.loadDefaultChartData();
    });
  }

  loadDefaultChartData():void{
    const countByActividad = this.sharedDataService.getCountByActividadComercial();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      const labels = Object.keys(countByActividad);
      const dataValues = Object.values(countByActividad);

    this.data = {
                  labels: labels,
                  datasets: [
                      {
                          data: dataValues,
                          backgroundColor: [  documentStyle.getPropertyValue('--blue-500'), 
                                        documentStyle.getPropertyValue('--yellow-500'), 
                                        documentStyle.getPropertyValue('--green-500'),
                                        documentStyle.getPropertyValue('--purple-500'),
                                        documentStyle.getPropertyValue('--cyan-500'),
                                        documentStyle.getPropertyValue('--orange-500'),
                                        documentStyle.getPropertyValue('--indigo-500'),
                                        documentStyle.getPropertyValue('--gray-500'),                                                                                
                                        documentStyle.getPropertyValue('--red-500'),
                                        documentStyle.getPropertyValue('--teal-500'),                                        
                                        documentStyle.getPropertyValue('--pink-500'),                                        
                                        '#8b4513', // SaddleBrown
                                        '#1A237E', // DarkBlue
                                        '#FFD700', // Amber
                                        '#A52A2A', // Brown 
                                        '#76FF03',
                                        '#212121',
                                        '#AA00FF',

                                                      
                                    ],
                    hoverBackgroundColor: [ documentStyle.getPropertyValue('--blue-300'), 
                                            documentStyle.getPropertyValue('--yellow-300'), 
                                            documentStyle.getPropertyValue('--green-300'),
                                            documentStyle.getPropertyValue('--purple-300'),
                                            documentStyle.getPropertyValue('--cyan-300'),
                                            documentStyle.getPropertyValue('--orange-300'),
                                            documentStyle.getPropertyValue('--indigo-300'),
                                            documentStyle.getPropertyValue('--gray-300'),                                                                                       
                                            documentStyle.getPropertyValue('--red-300'),
                                            documentStyle.getPropertyValue('--teal-300'),                                            
                                            documentStyle.getPropertyValue('--pink-300'),
                                            '#A1887F',
                                            '#5C6BC0',  
                                            '#FFFF8D', 
                                            '#A1887F',  
                                            '#CCFF90', 
                                            '#757575', 
                                            '#B388FF',                                  
                                        ]
                      }
                  ]
    };
 
    const nPosition = Chart.overrides.pie.plugins.legend.position = 'left';
    const nAlign = Chart.overrides.pie.plugins.legend.align = 'start';
    this.options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display:true,
          position: nPosition,
          align: nAlign,
          onHover:((event: { chart: { canvas: { style: { cursor: string; }; }; }; }) =>{
            event.chart.canvas.style.cursor = 'pointer';
          }),
          onLeave:((event: { chart: { canvas: { style: { cursor: string; }; }; }; }) =>{
            event.chart.canvas.style.cursor = 'default';
          }),
          labels: {
              //usePointStyle: true,
              color: textColor,
              position:left,
              display:true
          }
          }
      }
    }; 
    
  }

updateChartData(data:any[]):void{
  this.updatePieChart(data[0]);
}

updatePieChart(countByActividad:{[actividad:string]:number}):void{
  try {
    
    const labels = Object.keys(countByActividad);
    const dataValues =  labels.map((actividad) => countByActividad[actividad]);

    this.data.labels = labels;
    if (this.data.datasets) {
      this.data.datasets[0].data = dataValues;
    }

  } catch (error) {
    console.error(error);
  }
}



}
