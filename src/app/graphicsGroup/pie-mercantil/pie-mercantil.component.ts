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

    const dataValues = ['Activa', 'Inactiva', 'Cancelada', 'Disuelta', 'Disuelta y Liquidada', 'No definido'].map((estado) => countByEstado[estado] || 0);

    this.data = {
                  labels: this.data.labels,//['Activa', 'Disuelta', 'Disuelta y Liquidada','Inactiva','No definido',"Cancelada"],
                  datasets: [
                      {
                          label:'Cantidad: ',
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
                                        ],
                        hoverOffset:50
                      }
                  ]
    };

    this.options = {
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          backgroundColor:'rgba(255, 255, 255, 0.8)',
          titleColor:'rgb(0,0,0)',
          titleFont:{weight: 'bold'},
          titleAlign:'center',
          titleSpacing:2,
          titleMarginBottom:6,
          bodyColor:'rgb(0,0,0)',
          //bodyFont:({family:"'Arial', sans-serif"}),
          bodyFont:{size:16},
          padding:16,
          //caretPadding:15,
          caretSize:0,
          cornerRadius:4,
          displayColors:false,
          //borderColor:'rgb(255, 0, 0)',
          borderWidth:2,
      },
          legend: {
              display:true,
              position:'left',
              align:'start',
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