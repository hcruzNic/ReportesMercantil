import { Component, OnInit } from '@angular/core';
import { left } from '@popperjs/core';
import { SharedDataService } from "src/app/services/shared-data.service";

@Component({
  selector: 'app-pie-municipios',
  templateUrl: './pie-municipios.component.html',
  styleUrls: ['./pie-municipios.component.css']
})
export class PieMunicipiosComponent implements OnInit {

  constructor(private sharedDataService:SharedDataService) { }
  data: any = {};
  options: any; 

  ngOnInit(): void {

    this.sharedDataService.getCountByMunicipio$().subscribe((countByMunicipio) => {
      this.updateChartData([countByMunicipio]);
      this.loadDefaultChartData();
  });

  }


  loadDefaultChartData():void{
    const countByMunicipio = this.sharedDataService.getCountByMunicipio();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      const labels = Object.keys(countByMunicipio);
      const dataValues = Object.values(countByMunicipio);

    this.data = {
                  labels: labels,
                  datasets: [
                      {
                          data: dataValues,
                          backgroundColor: [
                                              documentStyle.getPropertyValue('--blue-500'), 
                                              documentStyle.getPropertyValue('--yellow-500'), 
                                              documentStyle.getPropertyValue('--green-500'),
                                              documentStyle.getPropertyValue('--purple-500'),
                                              documentStyle.getPropertyValue('--cyan-500'),
                                              documentStyle.getPropertyValue('--orange-500'),
                                              documentStyle.getPropertyValue('--magenta-500'),
                                              documentStyle.getPropertyValue('--red-500:'),
                                              documentStyle.getPropertyValue('--teal-500'),
                                              documentStyle.getPropertyValue('--lime-500'),
                                              documentStyle.getPropertyValue('--pink-500'),
                                              documentStyle.getPropertyValue('--amber-500'),
                                              documentStyle.getPropertyValue('--indigo-500'),
                                              documentStyle.getPropertyValue('--brown-500'),
                                              documentStyle.getPropertyValue('--grey-500')],                                              
                          hoverBackgroundColor: [
                                              documentStyle.getPropertyValue('--blue-400'), 
                                              documentStyle.getPropertyValue('--yellow-400'), 
                                              documentStyle.getPropertyValue('--green-400'),
                                              documentStyle.getPropertyValue('--purple-400'),
                                              documentStyle.getPropertyValue('--cyan-400'),
                                              documentStyle.getPropertyValue('--orange-400'),
                                              documentStyle.getPropertyValue('--magenta-400'),
                                              documentStyle.getPropertyValue('--red-400:'),
                                              documentStyle.getPropertyValue('--teal-400'),
                                              documentStyle.getPropertyValue('--lime-400'),
                                              documentStyle.getPropertyValue('--pink-400'),
                                              documentStyle.getPropertyValue('--amber-400'),
                                              documentStyle.getPropertyValue('--indigo-400'),
                                              documentStyle.getPropertyValue('--brown-400'),
                                              documentStyle.getPropertyValue('--grey-400')]
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

updateChartData(data:any[]):void{
  this.updatePieChart(data[0]);
}

updatePieChart(countByMunicipio:{[estado:string]:number}):void{
  try {
    
    const labels = Object.keys(countByMunicipio);
    const dataValues =  labels.map((municipio) => countByMunicipio[municipio]);

    this.data.labels = labels;
    if (this.data.datasets) {
      this.data.datasets[0].data = dataValues;
    }

  } catch (error) {
    console.error(error);
  }
}




}
