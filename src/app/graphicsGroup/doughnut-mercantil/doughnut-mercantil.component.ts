import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-doughnut-mercantil',
  templateUrl: './doughnut-mercantil.component.html',
  styleUrls: ['./doughnut-mercantil.component.css']
})
export class DoughnutMercantilComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService) { }

  data: any = {};
  options: any;
  labels: string[] = [];
  dataValues:any[] = [];

  ngOnInit(): void {

        this.sharedDataService.getCountByTipoSociedad$().subscribe((countByTipoSociedad) =>{
            this.updateChartData([countByTipoSociedad]);
            this.loadDefaultCharData(countByTipoSociedad);
        });        
  }

    loadDefaultCharData(countByTipoSociedad: { [tipo: string]: any; }):void{

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        //const countByTipoSociedad = this.sharedDataService.getCountByTipoSociedad();
        //const labels = Object.keys(countByTipoSociedad);
        //const data = Object.values(countByTipoSociedad);

        this.data = {
            labels: this.labels,
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
            cutout: '50%',
            plugins:{
                tooltip: {
                    callbacks: {
                        label: (tooltipItem: any) => {                            
                          const item = countByTipoSociedad[this.labels[tooltipItem.dataIndex]];
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
                    position: 'left',
                    align: 'start',  
                    onHover:((event: { chart: { canvas: { style: { cursor: string; }; }; }; }) =>{
                        event.chart.canvas.style.cursor = 'pointer';
                    }),
                    onLeave:((event: { chart: { canvas: { style: { cursor: string; }; }; }; }) =>{
                        event.chart.canvas.style.cursor = 'default';
                    }),                 
                }
            },
            
        };

    }

    updateChartData(data:any[]):void{

        this.updateDoughnutChart(data[0]);
    }

    updateDoughnutChart(countByTipoSociedad:{[tipo:string]:number}):void{
        try {

            const total = Object.values(countByTipoSociedad).reduce((acc,value) => acc + value, 0);
            this.labels = Object.keys(countByTipoSociedad);

            this.dataValues = this.labels.map((tipoSociedad) => {
                const cantidad = countByTipoSociedad[tipoSociedad];
                const porcentaje = ((cantidad / total) * 100).toFixed(2);
                return {cantidad,porcentaje,tipoSociedad};
            });

            if (typeof this.data !== 'object' || this.data === null) {
                this.data = {};
            }

            //Actualiza los datos del gráfico
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
            console.error(error);
        }
    }      
}