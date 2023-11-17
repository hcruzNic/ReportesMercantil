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
    labels: string[] = [];
    dataValues:any[] = [];

  ngOnInit(): void {
    
      this.sharedDataService.getCountByEstado$().subscribe((countByEstado:ICountByEstado) => {
        this.updateChartData([countByEstado]);
        this.loadDefaultChartData(countByEstado);
      });    
  }

  loadDefaultChartData(countByEstado: ICountByEstado):void{
    //const countByEstado = this.sharedDataService.getCountByEstado();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const estados = ['Activa', 'Inactiva', 'Cancelada', 'Disuelta', 'Disuelta y Liquidada', 'No definido'];

    const dataValues = estados.map((estado) => countByEstado[estado as keyof ICountByEstado] || 0);

    this.data = {
                  labels: this.labels,//['Activa', 'Disuelta', 'Disuelta y Liquidada','Inactiva','No definido',"Cancelada"],
                  datasets: [
                      {
                          //label:'Cantidad: ',
                          data: this.dataValues.map(item => item.cantidad),
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
          callbacks: {
            label: (tooltipItem: any) => {   
              const estado = this.labels[tooltipItem.dataIndex];                         
              const item = countByEstado[estado as keyof ICountByEstado];
              const porcentaje = this.dataValues[tooltipItem.dataIndex].porcentaje;
              return [
                        `Cantidad: ${item}`,
                        `Porcentaje: ${porcentaje}%`
                    ] 
            }
          },
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
          borderColor:'rgb(192,192,192)',
          borderWidth:1,
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

  updateChartData(data: any[]): void {   
    this.updatePieChart(data[0]);
  }

  updatePieChart(countByEstado: { [estado: string]: number }): void {
    try {

      const total = Object.values(countByEstado).reduce((acc,value) => acc + value, 0);      
      this.labels = Object.keys(countByEstado);

      this.dataValues = this.labels.map((estado) => {
        const cantidad = countByEstado[estado];
        const porcentaje = ((cantidad / total) * 100).toFixed(2);
        return {cantidad, porcentaje, estado};
      });

      if (typeof this.data !== 'object' || this.data === null) {
        this.data = {};
      }
          
      // Actualiza los datos del gráfico
      this.data.labels = this.labels;

      if (!this.data.datasets) {                
        this.data.datasets = [];
      }

      if (this.data.datasets.length > 0) {
        this.data.datasets[0].data = this.dataValues.map(item => ({ cantidad: item.cantidad, porcentaje: item.porcentaje }));
      }else{
        this.data.datasets.push({data: this.dataValues.map(item => ({ cantidad: item.cantidad, porcentaje: item.porcentaje }))});
      }
      
    } catch (error) {
      console.error(error)
    }
  }  
}