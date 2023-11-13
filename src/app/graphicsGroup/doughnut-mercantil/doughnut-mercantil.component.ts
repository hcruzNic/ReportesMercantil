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

  ngOnInit(): void {

        this.sharedDataService.getCountByTipoSociedad$().subscribe((countByTipoSociedad) =>{
            this.updateChartData([countByTipoSociedad]);
            this.loadDefaultCharData();
        });
        
  }

    loadDefaultCharData():void{

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        const countByTipoSociedad = this.sharedDataService.getCountByTipoSociedad();

        const labels = Object.keys(countByTipoSociedad);
        const data = Object.values(countByTipoSociedad);

        this.data = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };

    }

    updateChartData(data:any[]):void{

        this.updateDoughnutChart(data[0]);
    }

    updateDoughnutChart(countByTipoSociedad:{[estado:string]:number}):void{
        try {

            const labels = Object.keys(countByTipoSociedad);
            const dataValues = labels.map((tipoSociedad) => countByTipoSociedad[tipoSociedad]);

            //Actualiza los datos del gráfico
            this.data.labels = labels;
            if (this.data.datasets) {
                this.data.datasets[0].data = dataValues;
            }
            
        } catch (error) {
            console.error(error);
        }
    }

        

}
